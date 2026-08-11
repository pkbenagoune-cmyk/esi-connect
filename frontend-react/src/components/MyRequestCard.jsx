import StatusBadge from "./StatusBadge";

export default function MyRequestCard({ request }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-slate-100 hover:shadow-lg transition">
      <StatusBadge status={request.status} />

      <h3 className="mt-4 text-xl font-semibold text-slate-900">{request.title}</h3>

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
    </div>
  );
}
