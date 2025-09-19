"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            image: "/peaceful-meditation-garden-with-soft-lighting.jpg",
            title: "Bem-vindos ao Grupo Espírita Scheilla",
            subtitle: "Um espaço de paz, amor e crescimento espiritual",
        },
        {
            image: "/spiritual-books-and-candles-in-serene-setting.jpg",
            title: "Estudos Espíritas",
            subtitle: "Aprofunde seus conhecimentos através do estudo e da reflexão",
        },
        {
            image: "/group-of-people-in-circle-meditation-spiritual-gat.jpg",
            title: "Comunidade Unida",
            subtitle: "Juntos no caminho da evolução espiritual e do amor ao próximo",
        },
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <section id="inicio" className="py-8 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl ">
                <div className="relative h-[60vh] overflow-hidden rounded-2xl shadow-xl">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center bg-no-repeat rounded-2xl"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 rounded-2xl" />
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white px-4 max-w-4xl">
                                    <h1 className="text-3xl md:text-5xl font-heading text-white mb-6 text-balance fade-in tracking-wide">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl font-body text-white/90 text-pretty fade-in font-light tracking-wide">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Buttons */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 transition-colors"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 transition-colors"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </Button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroCarousel