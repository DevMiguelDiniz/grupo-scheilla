"use client"

import React, { useState } from "react"
import { VolunteersHeader } from "@/components/volunteers/VolunteersHeader"
import { VolunteersStats } from "@/components/volunteers/VolunteersStats"
import { VolunteersFilters } from "@/components/volunteers/VolunteersFilters"
import { VolunteersList } from "@/components/volunteers/VolunteersList"
import { volunteers } from "@/mocks/Volunteers"
import {Sidebar} from "@/components/sidebar/sidebar";

export default function VolunteersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState("All")
    const [selectedStatus, setSelectedStatus] = useState("All")
    const [showFilters, setShowFilters] = useState(false)

    const filteredVolunteers = volunteers.filter(volunteer => {
        const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteer.areas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesType = selectedType === "All" || volunteer.type === selectedType
        const matchesStatus = selectedStatus === "All" || 
            (selectedStatus === "Active" && volunteer.active) ||
            (selectedStatus === "Inactive" && !volunteer.active)
        return matchesSearch && matchesType && matchesStatus
    })

    return (
        <div className="min-h-screen bg-background">
            <main className="w-full overflow-auto">
                <Sidebar />
                <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                    <VolunteersHeader />
                    <VolunteersStats volunteers={volunteers} />
                    <VolunteersFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                    />
                    <VolunteersList 
                        volunteers={filteredVolunteers}
                        searchTerm={searchTerm}
                        selectedType={selectedType}
                        selectedStatus={selectedStatus}
                    />
                </div>
            </main>
        </div>
    )
}