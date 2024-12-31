import Header from "@/components/Header";

export default function EditProfilePage() {
  return (
    <div className="h-full bg-black text-white overflow-scroll aspect-maybevideo">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black pointer-events-none dark:opacity-0 h-full transition-opacity duration-300" />

      <div className="relative h-full p-8">
        {/* Header */}
        <Header
          title="Edit Profile"
          backHref="/settings"
          settingsHref="/settings"
          showSettings={false}
        />
      </div>
    </div>
  );
}
