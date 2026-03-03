import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

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
                <Avatar className="cursor-pointer">
                    <AvatarImage src="" />
                    <AvatarFallback>UK</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}

export default DashNavbar