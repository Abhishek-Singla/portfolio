// "Last updated" line with a route to report mistakes. Shows the date the text was last changed.
export default function UpdatedStamp({ date, className = "" }: { date: string; className?: string }) {
  return (
    <p className={`text-sm text-[var(--muted)] ${className}`}>
      Last updated {date}. Spot a mistake? <a href="/corrections" className="text-[var(--accent)] hover:underline">Tell me</a>.
    </p>
  );
}
