import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

function SettingRow({
  icon: Icon,
  title,
  children,
  href,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <span className="text-gray-200">{title}</span>
      </div>
      <div className="flex items-center space-x-2">{children}</div>
    </div>
  );

  const wrappedContent = href ? <Link to={href}>{content}</Link> : content;

  return <div className="divide-inherit">{wrappedContent}</div>;
}

export default SettingRow;
