export default function ReputationBadge({ average, count }) {
  if (!count) {
    return <p className="text-sm text-slate-500 italic">Pas encore d'avis</p>;
  }

  const pleines = Math.round(average);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= pleines ? "text-yellow-400" : "text-slate-300"}>★</span>
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-800">{average}</span>
      <span className="text-sm text-slate-500">({count} avis)</span>
    </div>
  );
}
