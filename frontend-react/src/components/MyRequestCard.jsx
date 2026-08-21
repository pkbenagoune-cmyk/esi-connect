import { useState } from "react";
import StatusBadge from "./StatusBadge";
import RatingForm from "./RatingForm";

export default function MyRequestCard({ request, onRate }) {
  const [showRating, setShowRating] = useState(false);

  const canRate = request.status === "COMPLETED" && !request.rating_id;

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-slate-100 hover:shadow-lg transition">
      <StatusBadge status={request.status} />

      <h3 className="mt-4 text-xl font-semibold text-slate-900">{request.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{request.description}</p>

      <div className="mt-3 space-y-1 text-slate-600 text-sm">
        <p><strong>Matière :</strong> {request.subject_name}</p>
        <p><strong>Difficulté :</strong> {request.difficulty}</p>
      </div>

      {request.tutor_first_name
        ? <p className="mt-3 text-sm text-slate-600">Tuteur : <strong>{request.tutor_first_name} {request.tutor_last_name}</strong></p>
        : <p className="mt-3 text-sm italic text-slate-400">En attente d'un tuteur...</p>}

      {request.tutor_response && (
        <div className="mt-3 bg-green-50 rounded-xl p-3 border border-green-100">
          <p className="text-sm text-slate-700">{request.tutor_response}</p>
        </div>
      )}

      {canRate && !showRating && (
        <button
          onClick={() => setShowRating(true)}
          className="mt-4 w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          ⭐ Noter le tuteur
        </button>
      )}

      {showRating && (
        <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
          <RatingForm
            requestId={request.id}
            onSubmitted={() => {
              setShowRating(false);
              if (onRate) onRate();
            }}
          />
        </div>
      )}

      {request.rating_id && (
        <p className="mt-3 text-sm text-green-600">✅ Vous avez déjà noté cette demande</p>
      )}
    </div>
  );
}
