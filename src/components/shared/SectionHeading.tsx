interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left"
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      <h2 className="text-3xl font-semibold text-green-900">{title}</h2>
      {subtitle ? (
        <p className="max-w-3xl text-base text-slate-700">{subtitle}</p>
      ) : null}
    </div>
  );
}
