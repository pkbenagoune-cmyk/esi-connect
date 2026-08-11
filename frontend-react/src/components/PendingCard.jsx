import StatusBadge from "./StatusBadge";

export default function PendingCard({ request, onAccept }) {
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

      <button
        onClick={() => onAccept(request.id)}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Accepter
      </button>
    </div>
  );
}
