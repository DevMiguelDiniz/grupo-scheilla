import { NextRequest, NextResponse } from 'next/server'

export interface YouTubeVideo {
    id: string
    title: string
    description: string
    thumbnail: string
    publishedAt: string
    duration?: string
    viewCount?: string
    isLive?: boolean
    isScheduled?: boolean
    scheduledStartTime?: string
}

export async function GET(request: NextRequest) {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY
        const channelId = process.env.YOUTUBE_CHANNEL_ID

        if (!apiKey || !channelId) {
            return NextResponse.json(
                { error: 'Configuração da API do YouTube não encontrada' },
                { status: 500 }
            )
        }

        const searchUrl = `https://www.googleapis.com/youtube/v3/search?` +
            `part=snippet&` +
            `channelId=${channelId}&` +
            `order=date&` +
            `type=video&` +
            `maxResults=20&` +
            `key=${apiKey}`

        const searchResponse = await fetch(searchUrl)

        if (!searchResponse.ok) {
            throw new Error(`Erro na busca: ${searchResponse.status}`)
        }

        const searchData = await searchResponse.json()

        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',')

        const videosUrl = `https://www.googleapis.com/youtube/v3/videos?` +
            `part=snippet,contentDetails,statistics,liveStreamingDetails&` +
            `id=${videoIds}&` +
            `key=${apiKey}`

        const videosResponse = await fetch(videosUrl)

        if (!videosResponse.ok) {
            throw new Error(`Erro nos detalhes: ${videosResponse.status}`)
        }

        const videosData = await videosResponse.json()

        const videos: YouTubeVideo[] = videosData.items.map((item: any) => {
            const snippet = item.snippet
            const contentDetails = item.contentDetails
            const statistics = item.statistics
            const liveStreamingDetails = item.liveStreamingDetails

            const isLive = !!(
                liveStreamingDetails?.actualStartTime ||
                liveStreamingDetails?.scheduledStartTime ||
                snippet.liveBroadcastContent !== 'none'
            )

            const isScheduled = !!(
                liveStreamingDetails?.scheduledStartTime &&
                !liveStreamingDetails?.actualStartTime &&
                new Date(liveStreamingDetails.scheduledStartTime) > new Date()
            )

            return {
                id: item.id,
                title: snippet.title,
                description: snippet.description,
                thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
                publishedAt: snippet.publishedAt,
                duration: contentDetails.duration,
                viewCount: statistics?.viewCount,
                isLive,
                isScheduled,
                scheduledStartTime: liveStreamingDetails?.scheduledStartTime
            }
        })

        const lives = videos
            .filter(video => video.isLive)
            .sort((a, b) => {
                if (a.isScheduled && !b.isScheduled) return -1
                if (!a.isScheduled && b.isScheduled) return 1

                if (a.isScheduled && b.isScheduled) {
                    const dateA = new Date(a.scheduledStartTime || a.publishedAt)
                    const dateB = new Date(b.scheduledStartTime || b.publishedAt)
                    return dateA.getTime() - dateB.getTime()
                }

                return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            })

        return NextResponse.json({
            success: true,
            videos: lives.slice(0, 4)
        })

    } catch (error) {
        console.error('Erro ao buscar vídeos do YouTube:', error)

        return NextResponse.json(
            {
                error: 'Erro ao carregar vídeos do YouTube',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            },
            { status: 500 }
        )
    }
}