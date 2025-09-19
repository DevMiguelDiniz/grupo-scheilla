"use client"

import { useState } from "react"
import { Play } from "lucide-react"

const VideosSection = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

    const videos = [
        {
            id: "dQw4w9WgXcQ",
            title: "O Que é o Espiritismo?",
            description: "Uma introdução aos princípios básicos da doutrina espírita",
            thumbnail: "/spiritual-books-and-meditation.jpg",
        },
        {
            id: "dQw4w9WgXcQ",
            title: "A Importância da Oração",
            description: "Como a oração pode transformar nossa vida espiritual",
            thumbnail: "/person-praying-in-peaceful-setting.jpg",
        },
        {
            id: "dQw4w9WgXcQ",
            title: "Caridade e Amor ao Próximo",
            description: "Reflexões sobre a prática da caridade no dia a dia",
            thumbnail: "/hands-helping-others-charity-work.jpg",
        },
        {
            id: "dQw4w9WgXcQ",
            title: "Mediunidade e Responsabilidade",
            description: "Entendendo o dom mediúnico e sua importância",
            thumbnail: "/spiritual-medium-in-meditation.jpg",
        },
    ]

    return (
        <section id="videos" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading text-primary mb-4">Vídeos Espirituais</h2>
                    <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Assista aos nossos seminários semanais disponíveis no YouTube
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50"
                        >
                            <div className="relative group cursor-pointer" onClick={() => setSelectedVideo(video.id)}>
                                <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url(${video.thumbnail})` }}>
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Play className="w-8 h-8 text-primary-foreground ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-card-foreground mb-3 text-balance">{video.title}</h3>
                                <p className="text-muted-foreground text-pretty">{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Video Modal */}
                {selectedVideo && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-card rounded-xl overflow-hidden max-w-4xl w-full">
                            <div className="flex justify-between items-center p-4 border-b border-border">
                                <h3 className="text-lg font-semibold">Vídeo Espiritual</h3>
                                <button onClick={() => setSelectedVideo(null)} className="text-muted-foreground hover:text-foreground">
                                    ✕
                                </button>
                            </div>
                            <div className="aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default VideosSection
