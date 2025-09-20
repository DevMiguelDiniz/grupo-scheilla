"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, DollarSign, Users, Megaphone, UserCheck, LogOut, Menu, X, Heart } from "lucide-react"

interface SidebarProps {
  className?: string
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    active: true,
  },
  {
    title: "Despesas",
    icon: DollarSign,
    href: "/despesas",
  },
  {
    title: "Famílias",
    icon: Users,
    href: "/familias",
  },
  {
    title: "Campanhas",
    icon: Megaphone,
    href: "/campanhas",
  },
  {
    title: "Voluntários",
    icon: UserCheck,
    href: "/voluntarios",
  },
]

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-card/90 backdrop-blur-sm border border-border shadow-lg rounded-lg p-2 hover:bg-accent transition-colors"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} ${className || ""}`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            {!isCollapsed && (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-sidebar-foreground truncate">Scheilla</span>
                  <span className="text-xs text-muted-foreground truncate">Gestão</span>
                </div>
              </div>
            )}
            <button
              className="hidden md:flex h-8 w-8 p-0 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md items-center justify-center flex-shrink-0 transition-colors"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex-shrink-0 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">AD</span>
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-sidebar-foreground truncate">Administrador</span>
                  <span className="text-xs text-muted-foreground truncate">Grupo Espírita Scheilla</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.href}
                  className={`w-full flex items-center gap-3 h-11 px-3 rounded-lg font-medium transition-all ${
                    item.active
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  } ${isCollapsed ? "justify-center px-0" : "justify-start"}`}
                  onClick={() => {
                    router.push(item.href)
                    setIsMobileOpen(false)
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.title}</span>}
                </button>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              className={`w-full flex items-center gap-3 h-11 px-3 rounded-lg font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all ${
                isCollapsed ? "justify-center px-0" : "justify-start"
              }`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">Sair</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
