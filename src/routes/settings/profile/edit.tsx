import Header from "@/components/Header";

export default function EditProfilePage() {
  return (
    <div className="h-full text-white overflow-scroll ">
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
