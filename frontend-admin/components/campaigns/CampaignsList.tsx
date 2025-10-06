// components/campaigns/CampaignsList.tsx
import { Megaphone } from "lucide-react"
import { CampaignCard } from "./CampaignCard"

interface Campaign {
    id: number
    title: string
    description: string
    startDate: string
    endDate: string
    type: string
    status: string
    goal: string
    collected: string
}

interface CampaignsListProps {
    campaigns: Campaign[]
    searchTerm: string
    selectedType: string
    selectedStatus: string
}

export function CampaignsList({
                                  campaigns,
                                  searchTerm,
                                  selectedType,
                                  selectedStatus
                              }: CampaignsListProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Lista de Campanhas</h2>

            <div className="space-y-3">
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>

            {campaigns.length === 0 && (
                <div className="text-center py-12">
                    <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        Nenhuma campanha encontrada
                    </h3>
                    <p className="text-muted-foreground">
                        {searchTerm || selectedType !== "Todos" || selectedStatus !== "Todas"
                            ? "Tente ajustar os filtros de busca"
                            : "Cadastre a primeira campanha do sistema"
                        }
                    </p>
                </div>
            )}
        </div>
    )
}