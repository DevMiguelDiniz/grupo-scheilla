"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CalendarModal from "./calendar-modal"

interface Event {
    date: string
    title: string
    time: string
    location: string
    description: string
    type: "evento" | "campanha"
}

const InteractiveCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const events: Event[] = [
        {
            date: "2025-09-11",
            title: "Hoje - Estudo do Evangelho",
            time: "19:30",
            location: "Sala Principal",
            description: "Estudo semanal dos ensinamentos de Jesus sob a ótica espírita",
            type: "evento",
        },
        {
            date: "2025-09-15",
            title: "Palestra: O Perdão",
            time: "20:00",
            location: "Auditório",
            description: "Reflexões sobre o poder transformador do perdão em nossas vidas",
            type: "evento",
        },
        {
            date: "2025-09-18",
            title: "Campanha de Agasalhos",
            time: "14:00",
            location: "Centro Espírita",
            description: "Arrecadação de roupas e cobertores para famílias necessitadas",
            type: "campanha",
        },
        {
            date: "2025-09-22",
            title: "Campanha do Leite",
            time: "09:00",
            location: "Recepção",
            description: "Arrecadação de leite em pó para crianças carentes",
            type: "campanha",
        },
        {
            date: "2025-09-25",
            title: "Reunião Mediúnica",
            time: "19:00",
            location: "Sala de Passes",
            description: "Trabalho espiritual de desobsessão e orientação",
            type: "evento",
        },
        {
            date: "2025-09-29",
            title: "Evangelização Infantil",
            time: "15:00",
            location: "Sala das Crianças",
            description: "Atividades educativas para as crianças",
            type: "evento",
        },
    ]

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const getEventsForDate = (dateString: string) => {
        return events.filter((event) => event.date === dateString)
    }

    const isToday = (day: number) => {
        const today = new Date()
        return (
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear()
        )
    }

    const handleDateClick = (day: number) => {
        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        setSelectedDate(dateString)
        setIsModalOpen(true)
    }

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev)
            if (direction === "prev") {
                newDate.setMonth(prev.getMonth() - 1)
            } else {
                newDate.setMonth(prev.getMonth() + 1)
            }
            return newDate
        })
    }

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
    ]

    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

    return (
        <div className="bg-card rounded-xl p-5 shadow-lg border border-border/50 w-full max-w-5xl mx-auto">
            {/* Header do calendário */}
            <div className="flex items-center justify-between mb-5">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateMonth("prev")}
                    className="hover:bg-primary/10 text-primary h-9 w-9"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <h3 className="text-3xl font-serif font-medium text-primary">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateMonth("next")}
                    className="hover:bg-primary/10 text-primary h-9 w-9"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1.5 mb-3">
                {dayNames.map((day) => (
                    <div
                        key={day}
                        className="text-left text-sm font-medium text-muted-foreground px-4 py-1.5 border-b border-border/20"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Dias do mês */}
            <div className="grid grid-cols-7 gap-1.5">
                {emptyDays.map((day) => (
                    <div key={`empty-${day}`} className="w-20 h-20"></div>
                ))}
                {days.map((day) => {
                    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                    const dayEvents = getEventsForDate(dateString)
                    const hasEvents = dayEvents.length > 0

                    return (
                        <div
                            key={day}
                            className={`w-20 h-20 border border-border/20 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:scale-105 flex flex-col ${
                                isToday(day)
                                    ? "bg-green-700 text-white hover:bg-green-300 hover:text-black font-semibold"
                                    : hasEvents
                                        ? "bg-gradient-to-br from-secondary/10 to-accent/5 hover:bg-muted/30"
                                        : "bg-background hover:bg-muted/30"
                            }`}
                            onClick={() => handleDateClick(day)}
                        >
                            <div className="p-1.5 h-full flex flex-col">
                                <div className={`text-sm font-medium mb-1 ${isToday(day) ? "" : "text-foreground"}`}>
                                    {day}
                                </div>

                                {/* Eventos resumidos */}
                                <div className="flex-1 space-y-0.5 overflow-hidden">
                                    {dayEvents.slice(0, 2).map((event, index) => (
                                        <div
                                            key={index}
                                            className={`text-[9px] px-1 py-0.5 rounded text-white truncate leading-tight font-medium ${
                                                event.type === "evento" ? "bg-primary/80" : "bg-secondary/80"
                                            }`}
                                            title={`${event.time} - ${event.title}`}
                                        >
                                            {event.time.substring(0, 5)}
                                            <br />
                                            <span className="text-[8px]">{event.title.substring(0, 10)}...</span>
                                        </div>
                                    ))}
                                    {dayEvents.length > 2 && (
                                        <div className="text-[9px] text-muted-foreground font-medium text-center">
                                            +{dayEvents.length - 2} mais
                                        </div>
                                    )}
                                </div>

                                {/* Indicador visual de eventos */}
                                {hasEvents && (
                                    <div className="flex justify-center mt-0.5">
                                        <div className={`w-1 h-1 rounded-full ${dayEvents.some(e => e.type === "campanha") ? "bg-primary" : "bg-secondary"}`}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Legenda compacta */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Eventos</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-secondary rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Campanhas</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-primary ring-2 ring-primary/30 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Hoje</span>
                </div>
            </div>

            {/* Modal de eventos */}
            <CalendarModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                date={selectedDate || ""}
                events={selectedDate ? getEventsForDate(selectedDate) : []}
            />
        </div>
    )
}

export default InteractiveCalendar