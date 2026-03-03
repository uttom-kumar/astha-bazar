import { Button } from "@/components/ui/button"
import {LogOutIcon, Menu, SettingsIcon, UserIcon} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Link} from "react-router-dom";

const DashNavbar = ({ toggle }) => {
    return (
        <header className="h-14 border-b bg-background flex items-center px-6">

            {/* Left */}
            <div className={"w-[250px] flex items-center justify-between"}>
                <h1 className="font-semibold text-lg">SosthBazar</h1>
            </div>
            <div className={"w-full flex items-center justify-between gap-5"}>
                <div className={"flex items-center justify-center"}>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={toggle}>
                            <Menu size={20} />
                        </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">Welcome back, Uttom</span>
                </div>
                {/* Right */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="" />
                            <AvatarFallback>UK</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link to={"/dashboard/profile"} className={"flex items-center gap-2"}>
                                    <UserIcon size={20}/> Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <SettingsIcon size={20}/> Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <LogOutIcon size={20}/> Logout
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default DashNavbar