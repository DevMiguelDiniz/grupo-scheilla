import Navbar from "@/app/components/navbar"
import HeroCarousel from "@/app/components/hero-carousel"
import EventsSection from "@/app/components/events-section"
import HistorySection from "@/app/components/history-section"
import VideosSection from "@/app/components/videos-section"
import BooksSection from "@/app/components/books-section"
import PhotosSection from "@/app/components/photos-section"
import LocationSection from "@/app/components/location-section"
import Footer from "@/app/components/footer"

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
