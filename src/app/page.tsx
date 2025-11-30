"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, Clock, Star, Search } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > 50) {
        setIsHeaderVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const filteredActivities = activities.filter(
    (activity) =>
      activity.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`bg-gradient-to-r from-[#FEE6B4] via-[#ffbb2e] to-[#FEE6B4] shadow-xl sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Compass logo removed */}
              <div className="w-0" />
              <div>
                <Image
                  src="https://lh3.googleusercontent.com/pw/AP1GczNS7cTzitiX6_q9XSHyRZOlsVxyMwvhYwGpNAvODFrhZwlFqDEAdwJlaaKhnRfdxwkZXraHlNmaFXerfXaFKvFyj3HIeTpF7RhEdzkKmZB6YoAGOupR9aNfIM-kc_KjU3e16Rxksw-i1VRMVo3hPSyX=w1150-h647-s-no-gm?authuser=0"
                  alt="beLocal logo"
                  width={150}
                  height={20}
                  className="h-auto"
                />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search activities or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white shadow-lg border-0 text-base"
            />
          </div>
        </div>
      </header>

      {/* Activities List */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-[#F5A623]">
          Outdoor Adventures
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-[#FEE6B4] hover:border-[#F5A623]"
              onClick={() => router.push(`/activity/${activity.id}`)}
            >
              <div className="flex gap-4 p-5">
                {/* Image */}
                <div className="relative w-44 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={activity.image}
                    alt={activity.titleEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <MapPin className="w-3 h-3 text-[#F5A623]" />
                    {activity.location}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-1 group-hover:text-[#F5A623] transition-colors">
                      {activity.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {activity.descriptionEn}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{activity.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-black">
                        {activity.price.toLocaleString()}đ
                      </div>
                      <div className="text-xs text-muted-foreground">per person</div>
                    </div>
                    <Button className="bg-[#F5A623] hover:bg-[#E09515] text-white font-semibold shadow-lg">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">No activities found</p>
          </div>
        )}
      </main>
    </div>
  )
}