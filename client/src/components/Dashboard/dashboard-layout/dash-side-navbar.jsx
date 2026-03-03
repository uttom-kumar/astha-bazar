import { Home, Box, Settings,ShoppingBag,SquarePlus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

const menus = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Product list", icon: Box, path: "/dashboard/product-list" },
    { name: "Add Product", icon: SquarePlus, path: "/dashboard/add-product" },
    { name: "Orders", icon: ShoppingBag, path: "/dashboard/orders" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
]

const DashSideNavbar = ({ open }) => {
    return (
        <aside
            className={cn(
                "h-screen bg-background transition-all duration-300 flex flex-col",
                open ? "w-[240px]" : "w-[70px]"
            )}
        >

            {/* Logo */}
            <div className="h-14 flex items-center justify-center font-bold text-lg border-b">
                {open ? "SB Admin" : "SB"}
            </div>

            {/* Menu */}
            <div className="flex-1 p-3 space-y-2">
                {menus.map((menu, i) => {
                    const Icon = menu.icon

                    return (
                        <NavLink key={i} to={menu.path}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full h-10",
                                        open
                                            ? "justify-start gap-3"
                                            : "justify-center"
                                    )}
                                >
                                    <Icon size={18} />
                                    {open && <span>{menu.name}</span>}
                                </Button>
                            )}
                        </NavLink>
                    )
                })}
            </div>

            <Separator />

            {/* Logout */}
            <div className="p-3">
                <Button
                    variant="outline"
                    className={cn(
                        "w-full",
                        open
                            ? "justify-start gap-3"
                            : "justify-center"
                    )}
                >
                    <LogOut size={18} />
                    {open && <span>Logout</span>}
                </Button>
            </div>

        </aside>
    )
}

export default DashSideNavbar