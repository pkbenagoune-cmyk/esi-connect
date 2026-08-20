
export default function MessageBubble({ message, isMine }) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
        isMine ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-800"
      }`}>
        {!isMine && (
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {message.sender_first_name}
          </p>
        )}
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}


