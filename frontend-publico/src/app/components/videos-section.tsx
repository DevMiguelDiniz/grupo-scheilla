    "use client"

    import { useState, useEffect } from "react"
    import { Play, Calendar, Users } from "lucide-react"

    interface YouTubeVideo {
        id: string
        title: string
        description: string
        thumbnail: string
        publishedAt: string
        duration?: string
        viewCount?: string
        isLive?: boolean
        scheduledStartTime?: string
    }

    const VideosSection = () => {
        const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
        const [videos, setVideos] = useState<YouTubeVideo[]>([])
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState<string | null>(null)

        useEffect(() => {
            const fetchYouTubeVideos = async () => {
                try {
                    setLoading(true)
                    setError(null)

                    const response = await fetch('/api/youtube-videos', {
                        next: { revalidate: 3600 }
                    })

                    if (!response.ok) {
                        throw new Error('Falha ao carregar vídeos')
                    }

                    const data = await response.json()

                    if (data.success && data.videos.length > 0) {
                        setVideos(data.videos)
                    } else {
                        console.log('Não foi encontrado vídeos')
                    }
                } catch (err) {
                    console.error('Erro ao carregar vídeos:', err)
                    setError('Não foi possível carregar os vídeos')
                } finally {
                    setLoading(false)
                }
            }

            fetchYouTubeVideos()
        }, [])

        const formatDate = (dateString: string) => {
            const date = new Date(dateString)
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        }

        const formatViewCount = (count: string | undefined) => {
            if (!count) return ''
            const num = parseInt(count)
            if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M visualizações`
            if (num >= 1000) return `${(num / 1000).toFixed(1)}K visualizações`
            return `${num} visualizações`
        }

        if (loading) {
            return (
                <section id="videos" className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-heading text-primary mb-4">Lives Espirituais</h2>
                            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
                                Carregando as lives mais recentes...
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/50">
                                    <div className="w-full h-48 bg-muted animate-pulse"></div>
                                    <div className="p-6 space-y-3">
                                        <div className="h-6 bg-muted rounded animate-pulse"></div>
                                        <div className="h-4 bg-muted rounded animate-pulse"></div>
                                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )
        }

        return (
            <section id="videos" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-heading text-primary mb-4">Lives Espirituais</h2>
                        <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
                            Assista às nossas lives espirituais mais recentes
                        </p>
                        {error && (
                            <p className="text-destructive text-sm mt-2">
                                {error} - Exibindo conteúdo em cache
                            </p>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {videos.map((video, index) => (
                            <div
                                key={`${video.id}-${index}`}
                                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50"
                            >
                                <div className="relative group cursor-pointer" onClick={() => setSelectedVideo(video.id)}>
                                    <div
                                        className="w-full h-48 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                                    >
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />



                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Play className="w-8 h-8 text-primary-foreground ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-card-foreground text-balance leading-tight flex-1">
                                            {video.title}
                                        </h3>
                                    </div>

                                    <p className="text-muted-foreground text-pretty text-sm mb-4 line-clamp-2">
                                        {video.description.substring(0, 120)}...
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(video.publishedAt)}</span>
                                        </div>

                                        {video.viewCount && (
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{formatViewCount(video.viewCount)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Video Modal */}
                    {selectedVideo && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                            <div className="bg-card overflow-hidden max-w-4xl w-full">
                                <div className="flex justify-between items-center p-3 bg-black/80">
                                    <button
                                        onClick={() => setSelectedVideo(null)}
                                        className="text-white hover:text-green-400 text-xl"
                                    >
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