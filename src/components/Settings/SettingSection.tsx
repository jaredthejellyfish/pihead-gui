import { Card, CardContent } from "../ui/card";

function SettingSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
        <div className="divide-y divide-white/10">{children}</div>
      </CardContent>
    </Card>
  );
}

export default SettingSection;
