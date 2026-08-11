import StatusBadge from "./StatusBadge";

export default function AnswerCard({ answer }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-slate-100 hover:shadow-lg transition">
      <StatusBadge status="COMPLETED" />

      <h3 className="mt-4 text-xl font-semibold text-slate-900">{answer.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{answer.subject_name}</p>

      <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-sm text-slate-700">{answer.tutor_response}</p>
      </div>

      <p className="mt-4 text-sm text-slate-500 border-t pt-4">
        Répondu par <strong>{answer.tutor_first_name} {answer.tutor_last_name}</strong>
      </p>
    </div>
  );
}
