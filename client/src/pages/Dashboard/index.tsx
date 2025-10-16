import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

const Dashboard = () => {
  const location = useLocation();

  const sectionTitle = location.pathname.split("/")[2];
  const capitalizedSectionTitle =
    sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1);

  document.title = `TaskFlow | ${capitalizedSectionTitle}`;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-background via-accent/10 to-background">
        <DashboardNavbar />

        <div className="flex items-start gap-10 px-2 md:px-10 lg:px-20 py-10">
          <DashboardSidebar />

          <div className="px-6 space-y-6 max-w-xl md:max-w-7xl mx-auto flex-1">
            <h1 className="text-3xl font-bold">{capitalizedSectionTitle}</h1>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
