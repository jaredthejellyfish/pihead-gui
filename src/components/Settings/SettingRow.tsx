import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

function SettingRow({
  icon: Icon,
  title,
  children,
  href,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  href?: string;
  subtitle?: string;
}) {
  const content = (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <Icon className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-4">{children}</div>
    </div>
  );

  const wrappedContent = href ? <Link to={href}>{content}</Link> : content;

  return <div className="divide-inherit">{wrappedContent}</div>;
}

export default SettingRow;
