"use client"

import { X } from "lucide-react"
import { Button } from "./button"

interface Event {
    title: string
    time: string
    location: string
    description: string
    type: "evento" | "campanha"
}

interface CalendarModalProps {
    isOpen: boolean
    onClose: () => void
    date: string
    events: Event[]
}

const CalendarModal = ({ isOpen, onClose, date, events }: CalendarModalProps) => {
    if (!isOpen) return null

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-sans font-medium text-primary">Eventos - {formatDate(date)}</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="space-y-4">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/30">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-sans font-medium text-card-foreground">{event.title}</h4>
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full text-white ${
                                            event.type === "evento" ? "bg-primary" : "bg-secondary"
                                        }`}
                                    >
                    {event.type === "evento" ? "Evento" : "Campanha"}
                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1 font-sans">
                                    <p>
                                        <strong>Horário:</strong> {event.time}
                                    </p>
                                    <p>
                                        <strong>Local:</strong> {event.location}
                                    </p>
                                    <p className="mt-2 text-pretty">{event.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground font-sans text-center py-4">Nenhum evento programado para esta data.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CalendarModal
