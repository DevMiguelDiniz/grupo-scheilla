import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"
import EventsSection from "@/components/events-section"
import HistorySection from "@/components/history-section"
import VideosSection from "@/components/videos-section"
import BooksSection from "@/components/books-section"
import PhotosSection from "@/components/photos-section"
import LocationSection from "@/components/location-section"
import Footer from "@/components/footer"

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <HeroCarousel />
                <EventsSection />
                <HistorySection />
                <VideosSection />
                <BooksSection />
                <PhotosSection />
                <LocationSection />
            </main>
            <Footer />
        </div>
    )
}
