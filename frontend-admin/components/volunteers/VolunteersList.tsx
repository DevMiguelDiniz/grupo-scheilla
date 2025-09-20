import { UserCheck } from "lucide-react"
import { VolunteerCard } from "./VolunteersCard"

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

interface VolunteersListProps {
    volunteers: Volunteer[]
    searchTerm: string
    selectedType: string
    selectedStatus: string
}

export function VolunteersList({ 
    volunteers, 
    searchTerm, 
    selectedType, 
    selectedStatus 
}: VolunteersListProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Lista de Voluntários</h2>

            <div className="space-y-3">
                {volunteers.map((volunteer) => (
                    <VolunteerCard key={volunteer.id} volunteer={volunteer} />
                ))}
            </div>

            {volunteers.length === 0 && (
                <div className="text-center py-12">
                    <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                       Voluntários não encontrados
                    </h3>
                    <p className="text-muted-foreground">
                        {searchTerm || selectedType !== "Todos" || selectedStatus !== "Todos"
                            ? "Tente ajustar seus filtros de pesquisa"
                            : "Registre o primeiro voluntário no sistema"
                        }
                    </p>
                </div>
            )}
        </div>
    )
}