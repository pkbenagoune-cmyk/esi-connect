import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function Conversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api("/requests/conversations");
        setConversations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-center py-20 text-slate-500">Chargement...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Mes conversations</h1>
      {conversations.length === 0 ? (
        <p className="text-slate-400 italic">Aucune conversation pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {conversations.map((conv) => (
            <Link
              key={conv.request_id}
              to={`/messages/${conv.request_id}`}
              className="block border rounded-lg p-4 hover:bg-slate-50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-slate-900">{conv.title}</h2>
                  <p className="text-sm text-slate-500">{conv.subject_name} — avec {conv.other_first_name} {conv.other_last_name}</p>
                </div>
                {conv.unread_count > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {conv.unread_count}
                  </span>
                )}
              </div>
              {conv.last_message && (
                <p className="text-sm text-slate-600 mt-2 truncate">{conv.last_message}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
