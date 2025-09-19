"use client"

import { useState } from "react"
import { X } from "lucide-react"

const PhotosSection = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

    const photos = [
        {
            src: "/spiritual-medium-in-meditation.jpg",
            alt: "Reunião de estudos espíritas",
            title: "Estudos Semanais",
        },
        {
            src: "/spiritual-group-meeting-meditation-circle.jpg",
            alt: "Trabalho de caridade",
            title: "Ações de Caridade",
        },
        {
            src: "/placeholder.svg?height=300&width=400",
            alt: "Sessão de passes",
            title: "Passes Espirituais",
        },
        {
            src: "/placeholder.svg?height=300&width=400",
            alt: "Palestra espírita",
            title: "Palestras e Seminários",
        },
        {
            src: "/placeholder.svg?height=300&width=400",
            alt: "Evangelização infantil",
            title: "Evangelização Infantil",
        },
        {
            src: "/placeholder.svg?height=300&width=400",
            alt: "Nosso centro espírita",
            title: "Nosso Espaço",
        },
        {
            src: "/placeholder.svg?height=300&width=400",
            alt: "Confraternização",
            title: "Momentos de Confraternização",
        },
        {
            src: "/placeholder.svg?height=300&width=400",
            alt: "Grupo de estudos",
            title: "Grupos de Estudo",
        },
    ]

    return (
        <section id="fotos" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading text-primary mb-4">Galeria de Fotos</h2>
                    <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Momentos especiais de nossa comunidade espírita em ação
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            onClick={() => setSelectedPhoto(photo.src)}
                        >
                            <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${photo.src})` }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="font-semibold text-sm text-balance">{photo.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Photo Modal */}
                {selectedPhoto && (
                    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                        <div className="relative max-w-4xl max-h-full">
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                            <img
                                src={selectedPhoto || "/placeholder.svg"}
                                alt="Foto ampliada"
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PhotosSection
