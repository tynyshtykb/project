/**
 * Faint 12-column guides running the height of the page, aligned to the same
 * container as the content. Reads as drafting paper underneath the layout and
 * gives every section a visible structure to sit on.
 */
export function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-0 z-0 hidden select-none md:block"
    >
      <div className="shell h-full">
        <div className="grid h-full grid-cols-6 lg:grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className={`h-full border-l border-line/40 ${i >= 6 ? 'hidden lg:block' : ''} ${
                i === 0 ? 'border-l-0' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
