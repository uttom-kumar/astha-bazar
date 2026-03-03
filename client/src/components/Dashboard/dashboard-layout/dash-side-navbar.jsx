import { Home, Box, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

const menus = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Product list", icon: Box, path: "/dashboard/product-list" },
    { name: "Orders", icon: ShoppingBag, path: "/dashboard/orders" },
]

const DashSideNavbar = ({ open }) => {
    return (
        <aside
            className={cn(
                "h-screen bg-background transition-all duration-300 flex flex-col",
                open ? "w-[240px]" : "w-[70px]"
            )}
        >

            {/* Menu */}
            <div className="flex-1 p-2 space-y-2">
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

        </aside>
    )
}

export default DashSideNavbar