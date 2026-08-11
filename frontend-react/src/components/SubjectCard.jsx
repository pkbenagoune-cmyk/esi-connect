export default function SubjectCard({ subject }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-slate-100 hover:shadow-lg transition">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
        {subject.name.charAt(0)}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{subject.name}</h3>
      <p className="mt-2 text-slate-600">{subject.description}</p>
    </div>
  );
}
