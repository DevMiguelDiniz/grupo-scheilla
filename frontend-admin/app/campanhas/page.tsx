"use client"

import React, { useState } from "react"
import { CampaignsHeader } from "@/components/campaigns/CampaignsHeader"
import { CampaignsStats } from "@/components/campaigns/CampaignsStats"
import { CampaignsFilters } from "@/components/campaigns/CampaignsFilters"
import { CampaignsList } from "@/components/campaigns/CampaignsList"
import { campaigns } from "@/mocks/Campaigns"
import { Sidebar } from "@/components/sidebar/sidebar"

export default function CampaignsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState("Todos")
    const [selectedStatus, setSelectedStatus] = useState("Todas")
    const [showFilters, setShowFilters] = useState(false)

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.type.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType = selectedType === "Todos" || campaign.type === selectedType

        const matchesStatus = selectedStatus === "Todas" ||
            (selectedStatus === "Ativas" && campaign.status === "active") ||
            (selectedStatus === "Futuras" && campaign.status === "future") ||
            (selectedStatus === "Passadas" && campaign.status === "past")

        return matchesSearch && matchesType && matchesStatus
    })

    return (
        <div className="min-h-screen bg-background">
            <main className="w-full overflow-auto">
                <Sidebar />
                <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                    <CampaignsHeader />
                    <CampaignsStats campaigns={campaigns} />
                    <CampaignsFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                    />
                    <CampaignsList
                        campaigns={filteredCampaigns}
                        searchTerm={searchTerm}
                        selectedType={selectedType}
                        selectedStatus={selectedStatus}
                    />
                </div>
            </main>
        </div>
    )
}