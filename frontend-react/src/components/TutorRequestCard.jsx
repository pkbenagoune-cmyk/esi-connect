import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function TutorRequestCard({ request, onRespond }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  function handleSend() {
    if (!answer.trim()) {
      setError("La réponse ne peut pas être vide.");
      return;
    }
    setError("");
    onRespond(request.id, answer.trim());
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-slate-100 hover:shadow-lg transition">
      <StatusBadge status={request.status} />

      <h3 className="mt-4 text-xl font-semibold text-slate-900">{request.title}</h3>

      <div className="mt-3 space-y-1 text-slate-600 text-sm">
        <p><strong>Matière :</strong> {request.subject_name}</p>
        <p><strong>Difficulté :</strong> {request.difficulty}</p>
      </div>

      <p className="mt-3 text-sm text-slate-500 border-t pt-3">
        Demandé par <strong>{request.student_first_name} {request.student_last_name}</strong>
      </p>

      {request.status === "ACCEPTED" ? (
        <div className="mt-4">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            placeholder="Écris ta réponse..."
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          <button
            onClick={handleSend}
            className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Envoyer la réponse
          </button>
        </div>
      ) : (
        <div className="mt-4 bg-green-50 rounded-xl p-3 border border-green-100">
          <p className="text-sm text-slate-700">{request.tutor_response}</p>
        </div>
      )}
    </div>
  );
}
