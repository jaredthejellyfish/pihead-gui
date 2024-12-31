import { Settings } from "lucide-react";
import { ChevronLeft } from "lucide-react";

import { Link } from "react-router-dom";

type Props = {
  title: string;
  backHref: string;
  settingsHref: string;
  showSettings?: boolean;
};

function Header({
  title,
  backHref,
  settingsHref,
  showSettings = false,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Link to={backHref}>
          <button type="button" className="hover:bg-white/10 rounded-lg p-2">
            <ChevronLeft className="w-8 h-8" />
          </button>
        </Link>
        <h1 className="text-4xl font-light">{title}</h1>
      </div>
      {showSettings && (
        <Link to={settingsHref}>
          <button type="button" className="hover:bg-white/10 rounded-lg p-3">
            <Settings className="w-6 h-6" />
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;
