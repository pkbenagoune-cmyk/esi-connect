import { useState } from "react";
import { api } from "../services/api";

export default function RatingForm({ requestId, onSubmitted }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (stars === 0) {
      setError("Merci de sélectionner une note.");
      return;
    }

    setSending(true);
    setError("");

    try {
      await api(`/requests/${requestId}/rating`, {
        method: "POST",
        body: JSON.stringify({ stars, comment: comment.trim() })
      });
      if (onSubmitted) onSubmitted();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setStars(n)}
            className={`text-2xl ${n <= stars ? "text-yellow-400" : "text-slate-300"}`}
          >
            ★
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Un commentaire (facultatif)..."
        className="w-full border rounded p-2 text-sm"
        rows={3}
      />

      <button
        type="submit"
        disabled={sending}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
      >
        {sending ? "Envoi..." : "Envoyer mon avis"}
      </button>
    </form>
  );
}