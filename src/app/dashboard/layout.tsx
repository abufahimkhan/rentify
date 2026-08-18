import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <AppHeader />

                <main className="p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}