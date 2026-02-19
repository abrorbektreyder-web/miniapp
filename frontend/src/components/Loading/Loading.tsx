export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-tg-button border-t-tg-button/30 rounded-full animate-spin" />
        
        {/* Text */}
        <p className="text-tg-hint text-sm animate-pulse">Yuklanmoqda...</p>
      </div>
    </div>
  );
}
