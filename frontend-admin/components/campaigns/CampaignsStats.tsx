// components/campaigns/CampaignsStats.tsx
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

interface CampaignsStatsProps {
    campaigns: Campaign[]
}

export function CampaignsStats({ campaigns }: CampaignsStatsProps) {
    const activeCampaigns = campaigns.filter(c => c.status === "active").length
    const futureCampaigns = campaigns.filter(c => c.status === "future").length
    const pastCampaigns = campaigns.filter(c => c.status === "past").length

    return (
        <div className="bg-card border border-border/50 rounded-lg shadow-sm p-4 md:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Total de Campanhas</p>
                    <p className="text-2xl md:text-3xl font-bold text-emerald-600">{campaigns.length}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Campanhas Ativas</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-600">{activeCampaigns}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Campanhas Futuras</p>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">{futureCampaigns}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Campanhas Encerradas</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-600">{pastCampaigns}</p>
                </div>
            </div>
        </div>
    )
}