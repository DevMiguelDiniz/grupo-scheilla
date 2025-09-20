import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sistema Gestão Scheilla - Grupo Espírita",
  description: "Sistema de gestão para o Grupo Espírita Scheilla",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 md:ml-64 overflow-auto">
            <Suspense fallback={null}>{children}</Suspense>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}