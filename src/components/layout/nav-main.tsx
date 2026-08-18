"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingCart,
    ChartColumn,
    Package,
    Settings,
    Plus,
    History,
    CalendarDays,
    LucideIcon,
} from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

type MenuItem = {
    title: string;
    url: string;
    icon: LucideIcon;
};

type MenuGroup = {
    title: string;
    items: MenuItem[];
};

const dashboard: MenuItem = {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
};

const groups: MenuGroup[] = [
    {
        title: "Sales",
        items: [
            {
                title: "Today's Sales",
                url: "/dashboard/sales",
                icon: ShoppingCart,
            },
            {
                title: "Add Sale",
                url: "/dashboard/sales/add",
                icon: Plus,
            },
            {
                title: "History",
                url: "/dashboard/sales",
                icon: History,
            },
        ],
    },
    {
        title: "Reports",
        items: [
            {
                title: "Daily",
                url: "/dashboard/reports/daily",
                icon: CalendarDays,
            },
            {
                title: "Monthly",
                url: "/dashboard/reports/monthly",
                icon: ChartColumn,
            },
        ],
    },
    {
        title: "Products",
        items: [
            {
                title: "Products",
                url: "/dashboard/products",
                icon: Package,
            },
            {
                title: "Settings",
                url: "/dashboard/settings",
                icon: Settings,
            },
        ],
    },
];

export function NavMain() {
    const pathname = usePathname();

    return (
        <>
            {/* Dashboard */}
            <SidebarGroup>
                <SidebarGroupLabel>Main</SidebarGroupLabel>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href={dashboard.url}>
                            <SidebarMenuButton
                                isActive={pathname === dashboard.url}
                            >
                                <dashboard.icon className="size-4" />
                                <span>{dashboard.title}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

            {/* Other Groups */}
            {groups.map((group) => (
                <SidebarGroup key={group.title}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.url}>
                                <Link href={item.url}>
                                    <SidebarMenuButton
                                        isActive={pathname === item.url}
                                    >
                                        <item.icon className="size-4" />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}