import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 text-center">
      <div className="text-6xl">🧧</div>
      <h1 className="text-2xl font-bold text-angbao-gold">
        AngBao Not Found
      </h1>
      <p className="text-angbao-cream/60 text-sm">
        This red packet has disappeared into the void.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl font-bold text-sm
                   bg-gradient-to-r from-angbao-gold to-angbao-gold-light text-angbao-red-deep
                   shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Make Your Own
      </Link>
    </div>
  );
}
