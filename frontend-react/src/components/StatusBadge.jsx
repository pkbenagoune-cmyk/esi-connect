export default function StatusBadge({ status }) {
  const couleurs = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ACCEPTED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800"
  };

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${couleurs[status]}`}>
      {status}
    </span>
  );
}
