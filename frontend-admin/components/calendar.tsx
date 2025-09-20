"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

const events = [
  { date: 15, title: "Reunião Mediúnica", type: "meeting" },
  { date: 22, title: "Distribuição de Cestas", type: "charity" },
  { date: 28, title: "Palestra Espírita", type: "lecture" },
]

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 md:h-10"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = events.some((event) => event.date === day)
      const isToday =
        new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year

      days.push(
        <div
          key={day}
          className={`h-8 md:h-10 flex items-center justify-center text-sm relative cursor-pointer rounded-md transition-colors ${
            isToday ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
          }`}
        >
          {day}
          {hasEvent && (
            <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-chart-2 rounded-full"></div>
          )}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          <h3 className="text-lg md:text-xl font-semibold">Calendário</h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={previousMonth} className="p-1 hover:bg-muted rounded-md transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm md:text-base font-medium min-w-[120px] text-center">
            {months[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-1 hover:bg-muted rounded-md transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <h4 className="text-sm font-medium mb-2">Próximos Eventos</h4>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-chart-2 rounded-full flex-shrink-0"></div>
              <span className="text-muted-foreground">
                {event.date}/{month + 1}
              </span>
              <span className="truncate">{event.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
