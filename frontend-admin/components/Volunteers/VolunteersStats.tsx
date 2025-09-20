interface Volunteer {
    id: number
    name: string
    email: string
    phone: string
    address: string
    type: string
    joinDate: string
    active: boolean
    areas: string[]
}

interface VolunteersStatsProps {
    volunteers: Volunteer[]
}

export function VolunteersStats({ volunteers }: VolunteersStatsProps) {
    const totalVolunteers = volunteers.length
    const coordinators = volunteers.filter(v => v.type === "Coordinator").length
    const commonVolunteers = volunteers.filter(v => v.type === "Volunteer").length

    return (
        <div className="bg-card border border-border/50 rounded-lg shadow-sm p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Total de Voluntários</p>
                    <p className="text-2xl md:text-3xl font-bold text-emerald-600">{totalVolunteers}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Coordenadores</p>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">{coordinators}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Voluntários</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-600">{commonVolunteers}</p>
                </div>
            </div>
        </div>
    )
}