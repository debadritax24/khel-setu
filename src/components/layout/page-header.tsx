import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-white/10", className)}>
      <div>
        <div className="font-mono-tag text-[10px] uppercase tracking-widest text-[#FF4D12] mb-1">
          [ MODULE VIEW ]
        </div>
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm text-neutral-400 sm:text-base leading-relaxed">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
