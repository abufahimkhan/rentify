"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { AppBreadcrumb } from "./breadcrumb";

export function AppHeader() {
    return (
        <header className="flex h-16 items-center gap-4 border-b px-6">
            <SidebarTrigger />

            <Separator
                orientation="vertical"
                className="h-6"
            />

            <AppBreadcrumb />
        </header>
    );
}