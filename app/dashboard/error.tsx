"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl">{error.message}</h2>
      <button
        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 rounded-md mt-2"
        onClick={() => reset()}
      >
        Обновить
      </button>
    </div>
  );
}
