interface Family {
    id: number
    responsibleName: string
    address: string
    phone: string
    members: number
    registrationDate: string
    status: string
    observations: string
}

interface FamiliesStatsProps {
    families: Family[]
}

export function FamiliesStats({ families }: FamiliesStatsProps) {
    const totalFamilies = families.length
    const activeFamilies = families.filter(f => f.status === "active").length
    const totalMembers = families.reduce((sum, family) => sum + family.members, 0)

    return (
        <div className="bg-card border border-border/50 rounded-lg shadow-sm p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Total de Famílias</p>
                    <p className="text-2xl md:text-3xl font-bold text-emerald-600">{totalFamilies}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Famílias Ativas</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-600">{activeFamilies}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Total de Pessoas</p>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">{totalMembers}</p>
                </div>
            </div>
        </div>
    )
}