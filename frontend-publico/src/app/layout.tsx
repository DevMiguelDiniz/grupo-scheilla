import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
})

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
})

export const metadata: Metadata = {
    title: "Grupo Espírita Scheilla - Amor, Caridade e Evolução Espiritual",
    description:
        "Centro espírita dedicado ao estudo da doutrina espírita, práticas de caridade e crescimento espiritual. Venha conhecer nossa comunidade.",
    keywords: "espiritismo, centro espírita, caridade, evolução espiritual, Chico Xavier, Allan Kardec",
    authors: [{ name: "Grupo Espírita Scheilla" }],
    generator: "Next.js",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR" className="scroll-smooth">
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
        </body>
        </html>
    )
}