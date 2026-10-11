/**
 * Visible marker for content the founder must supply (Knowledge Base, Section 12).
 * Renders as [[TO BE CONFIRMED: label]] so nothing is mistaken for a real value.
 */
export function Placeholder({ label }: { label: string }) {
  return (
    <span className="tbc" data-placeholder={label}>
      [[TO BE CONFIRMED: {label}]]
    </span>
  );
}
