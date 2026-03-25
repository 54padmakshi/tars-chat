export default function TypingIndicator() {

  return (
    <div className="text-xs text-gray-500 flex gap-1">

      typing

      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-100">.</span>
      <span className="animate-bounce delay-200">.</span>

    </div>
  );
}