import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { socket } from "../services/socket";
import MessageBubble from "../components/MessageBubble";

export default function Conversation() {
  const requestId = Number(useParams().requestId);
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [socketReady, setSocketReady] = useState(false);
  const [typing, setTyping] = useState(false);
  const typingTimer = useRef(null);

  // 1. CHARGEMENT INITIAL REST
  useEffect(() => {
    let annule = false;

    async function charger() {
      try {
        const data = await api(`/requests/${requestId}/messages`);
        if (!annule) setMessages(data);
        await api(`/requests/${requestId}/messages/read`, { method: "PATCH" });
      } catch (err) {
        if (!annule) setError(err.message);
      } finally {
        if (!annule) setLoading(false);
      }
    }

    charger();
    return () => { annule = true; };
  }, [requestId]);

  // 2. SOCKET.IO : CONNEXION + ROOM
  useEffect(() => {
    function joinRoom() {
      console.log("Joining room:", requestId);
      socket.emit("join-conversation", requestId);
      setSocketReady(true);
    }

    function onNewMessage(message) {
      if (Number(message.request_id) !== requestId) return;
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]);
    }

    function onError(msg) {
      console.log("Socket error:", msg);
      setError(msg);
    }

    if (socket.connected) {
      joinRoom();
    } else {
      socket.on("connect", joinRoom);
      socket.connect(); // S'assurer que le socket essaie de se connecter
    }

    socket.on("new-message", onNewMessage);
    socket.on("error-message", onError);
    socket.on("user-typing", onTyping);

    return () => {
      socket.off("connect", joinRoom);
      socket.off("new-message", onNewMessage);
      socket.off("error-message", onError);
      socket.off("user-typing", onTyping);
      clearTimeout(typingTimer.current);
      socket.emit("leave-conversation", requestId);
    };
  }, [requestId]);

  // 3. ENVOI VIA SOCKET.IO (fallback REST si socket pas prêt)
  function handleChange(event) {
    setText(event.target.value);
    socket.emit("typing", { requestId });
  }

  function handleSend(event) {
    event.preventDefault();
    if (!text.trim()) return;

    if (socketReady && socket.connected) {
      // Envoi via Socket.IO
      socket.emit("send-message", {
        requestId,
        content: text.trim(),
      });
      setText("");
    } else {
      // Fallback REST
      api(`/requests/${requestId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content: text.trim() })
      })
        .then((newMsg) => {
          setMessages((prev) => [...prev, newMsg.data]);
          setText("");
        })
        .catch((err) => setError(err.message));
    }
  }
  if (loading) {
    return <p className="text-center py-20 text-slate-500">Chargement...</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      {error && <p className="text-red-600 text-center py-2">{error}</p>}
      {!socketReady && <p className="text-orange-500 text-center text-sm">Connexion temps réel en cours...</p>}

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMine={msg.sender_id === user.id}
          />
        ))}
      </div>

      {typing && <p className="text-xs text-slate-400 italic px-4">En train d'écrire...</p>}
      <form onSubmit={handleSend} className="flex gap-2 p-4 border-t">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Écris ton message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Envoyer
        </button>
      </form>
    </div>
  );
}
