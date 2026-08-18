"use client";

import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AppBreadcrumb() {
    const pathname = usePathname();

    const segments = pathname
        .split("/")
        .filter(Boolean);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        Dashboard
                    </BreadcrumbPage>
                </BreadcrumbItem>

                {segments.map((segment, index) => (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem key={index}>
                            <BreadcrumbPage className="capitalize">
                                {segment.replace("-", " ")}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}