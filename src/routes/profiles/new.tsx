import Header from "@/components/Header";

export default function NewProfilePage() {
  return (
    <div className="h-full bg-black text-white overflow-scroll aspect-video">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black pointer-events-none" />

      <div className="relative h-full p-8">
        {/* Header */}
        <Header
          title="New Profile"
          backHref="/profiles"
          settingsHref="/settings"
          showSettings
        />
      </div>
    </div>
  );
}