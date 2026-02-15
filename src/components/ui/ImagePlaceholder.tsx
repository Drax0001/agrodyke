interface ImagePlaceholderProps {
  className?: string;
  label?: string;
}

export default function ImagePlaceholder({
  className,
  label
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-2xl bg-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500 ${className ?? ""}`}
    >
      {label ?? "Image Placeholder"}
    </div>
  );
}
