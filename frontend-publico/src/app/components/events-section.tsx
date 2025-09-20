import InteractiveCalendar from "./interactive-calendar"

const EventsSection = () => {
    return (
        <section id="eventos" className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-heading text-primary mb-3 tracking-wide">Próximos Eventos</h2>
                    <p className="text-base font-body text-muted-foreground max-w-2xl mx-auto text-pretty font-light">
                        Participe de nossas atividades e fortaleça sua jornada espiritual em comunidade
                    </p>
                </div>

                <div className="flex justify-center">
                    <InteractiveCalendar />
                </div>
            </div>
        </section>
    )
}

export default EventsSection