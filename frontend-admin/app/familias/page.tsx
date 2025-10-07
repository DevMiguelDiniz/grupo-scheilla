"use client"

import React, { useState } from "react"
import { FamiliesHeader } from "@/components/families/FamiliesHeader"
import { FamiliesStats } from "@/components/families/FamiliesStats"
import { FamiliesFilters } from "@/components/families/FamiliesFilters"
import { FamiliesList } from "@/components/families/FamiliesList"
import { families } from "@/mocks/Families"
import { Sidebar } from "@/components/sidebar/sidebar"

export default function FamiliesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("Todas")
    const [showFilters, setShowFilters] = useState(false)

    const filteredFamilies = families.filter(family => {
        const matchesSearch = family.responsibleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            family.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            family.phone.includes(searchTerm)

        const matchesStatus = selectedStatus === "Todas" ||
            (selectedStatus === "Ativas" && family.status === "active") ||
            (selectedStatus === "Inativas" && family.status === "inactive")

        return matchesSearch && matchesStatus
    })

    return (
        <div className="min-h-screen bg-background">
            <main className="w-full overflow-auto">
                <Sidebar />
                <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                    <FamiliesHeader />
                    <FamiliesStats families={families} />
                    <FamiliesFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                    />
                    <FamiliesList
                        families={filteredFamilies}
                        searchTerm={searchTerm}
                        selectedStatus={selectedStatus}
                    />
                </div>
            </main>
        </div>
    )
}