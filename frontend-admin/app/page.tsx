"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulação de login - em produção, conectar com API real
        setTimeout(() => {
            if (username && password) {
                router.push("/dashboard")
            }
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4 mr-54">
            <div className="w-full max-w-md space-y-8">
                {/* Logo e Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                            <Image
                                src="../logo-scheilla.png"
                                alt="Logo Grupo Espírita Scheilla"
                                width={100}
                                height={100}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-balance">Grupo Espírita Scheilla</h1>
                        <p className="text-muted-foreground text-pretty">Sistema de Gestão Espiritual</p>
                    </div>
                </div>

                <div className="bg-card border border-border/50 rounded-lg shadow-2xl backdrop-blur-sm">
                    <div className="p-6 space-y-1 text-center">
                        <h2 className="text-2xl font-semibold">Entrar</h2>
                        <p className="text-muted-foreground">Acesse sua conta para continuar</p>
                    </div>
                    <div className="p-6 pt-0">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="username" className="text-sm font-medium block">
                                    Usuário
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Digite seu usuário"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="flex h-11 w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium block">
                                    Senha
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex h-11 w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Entrando...
                                    </div>
                                ) : (
                                    "Entrar"
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>© 2025 Grupo Espírita Scheilla</p>
                    <p className="mt-1">Desenvolvido com amor e dedicação</p>
                </div>
            </div>
        </div>
    )
}