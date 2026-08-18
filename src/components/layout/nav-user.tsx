"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <button className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted w-full">
                    <Avatar>
                        <AvatarFallback>AK</AvatarFallback>
                    </Avatar>

                    <div className="text-left">
                        <p className="text-sm font-medium">
                            Abu Fahim
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Administrator
                        </p>
                    </div>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}