import "./App.css";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/routes/Home";
import Profiles from "@/routes/profiles";
import Settings from "@/routes/settings";
import WiFiSettings from "@/routes/settings/wifi";
import BluetoothSettings from "@/routes/settings/bluetooth";
import DisplaySettings from "@/routes/settings/display";
import SoundSettings from "@/routes/settings/sound";
import NewProfilePage from "@/routes/profiles/new";
import SoftwareUpdatePage from "@/routes/settings/update";
import AboutPage from "@/routes/settings/about";
import EditProfilePage from "@/routes/settings/profile/edit";
import DeleteProfilePage from "@/routes/settings/profile/delete";
import { ThemeProvider } from "@/contexts/theme-provider";
import { ActiveProfileProvider } from "@/contexts/active-profile-provider";
import AnimationLayout from "@/layouts/AnimationLayout";
import PageLayout from "@/layouts/PageLayout";

export default function App() {
  return (
    <ActiveProfileProvider>
      <ThemeProvider defaultTheme="purple" storageKey="pihead-theme">
        <div className="min-h-screen bg-background text-foreground">
          <Router basename="/">
            <PageLayout>
              <AnimationLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profiles" element={<Profiles />} />
                  <Route path="/profiles/new" element={<NewProfilePage />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/settings/wifi" element={<WiFiSettings />} />
                  <Route
                    path="/settings/bluetooth"
                    element={<BluetoothSettings />}
                  />
                  <Route
                    path="/settings/display"
                    element={<DisplaySettings />}
                  />
                  <Route path="/settings/sound" element={<SoundSettings />} />
                  <Route
                    path="/settings/update"
                    element={<SoftwareUpdatePage />}
                  />
                  <Route path="/settings/about" element={<AboutPage />} />
                  <Route
                    path="/settings/profile/edit"
                    element={<EditProfilePage />}
                  />
                  <Route
                    path="/settings/profile/delete"
                    element={<DeleteProfilePage />}
                  />
                </Routes>
              </AnimationLayout>
            </PageLayout>
          </Router>
        </div>
      </ThemeProvider>
    </ActiveProfileProvider>
  );
}
