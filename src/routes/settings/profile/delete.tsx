import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { AlertTriangle, Trash, User } from "lucide-react";
import type { Profile } from "@/types";

export default function DeleteProfilePage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveProfile = async () => {
      const activeProfile = await window.electron.getActiveProfile();
      setActiveProfile(activeProfile);
    };
    fetchActiveProfile();
  }, []);

  const handleDeleteProfile = async () => {
    try {
      setIsDeleting(true);
      const activeProfile = await window.electron.getActiveProfile();

      if (!activeProfile?.id) {
        console.error("No active profile found");
        return;
      }

      const success = await window.electron.deleteProfile(activeProfile.id);

      if (success) {
        navigate("/profiles");
      } else {
        console.error("Failed to delete profile");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-full text-white overflow-scroll ">
      <div className="relative h-full p-8">
        <Header
          title="Delete Profile"
          backHref="/settings"
          settingsHref="/settings"
          showSettings={false}
        />

        <div className="space-y-6 pb-6 max-w-xl mx-auto">
          {/* Warning Card */}
          <Card className="bg-red-500/10 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Delete Profile Permanently
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    This action cannot be undone. This will permanently delete
                    your profile, including all settings, preferences, and saved
                    data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Preview */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Current Profile
                  </h3>
                  <p className="text-gray-400 mt-1">{activeProfile?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button
              variant="ghost"
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 w-full py-6"
              onClick={handleDeleteProfile}
              disabled={isDeleting}
            >
              <Trash className="w-5 h-5 mr-2" />
              {isDeleting ? "Deleting..." : "Delete Profile"}
            </Button>

            <Button
              variant="ghost"
              className="bg-white/5 hover:bg-white/10 text-white w-full py-6"
              onClick={() => navigate("/settings")}
            >
              Cancel
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Note: You will be redirected to the profiles page after deletion
          </p>
        </div>
      </div>
    </div>
  );
}
