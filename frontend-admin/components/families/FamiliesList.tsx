import { Users } from "lucide-react"
import { FamilyCard } from "./FamilyCard"

interface FamilyMember {
    id?: number
    name: string
    age: number
    relationship: string
}

interface Family {
    id: number
    responsibleName: string
    address: string
    phone: string
    members: number
    registrationDate: string
    status: string
    observations: string
    membersList: FamilyMember[]
}

interface FamiliesListProps {
    families: Family[]
    searchTerm: string
    selectedStatus: string
}

export function FamiliesList({
                                 families,
                                 searchTerm,
                                 selectedStatus
                             }: FamiliesListProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Lista de Famílias</h2>

            <div className="space-y-3">
                {families.map((family) => (
                    <FamilyCard key={family.id} family={family} />
                ))}
            </div>

            {families.length === 0 && (
                <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        Nenhuma família encontrada
                    </h3>
                    <p className="text-muted-foreground">
                        {searchTerm || selectedStatus !== "Todas"
                            ? "Tente ajustar os filtros de busca"
                            : "Cadastre a primeira família do sistema"
                        }
                    </p>
                </div>
            )}
        </div>
    )
}