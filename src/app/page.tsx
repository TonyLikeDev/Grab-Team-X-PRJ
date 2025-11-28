"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, Clock, Star, Search, Compass } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActivities = activities.filter(
    (activity) =>
      activity.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-accent to-primary/90 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <Compass className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">SEA STORIES</h1>
                <p className="text-sm text-white/90">Discover Vietnam</p>
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
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Outdoor Adventures
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50"
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
                    <MapPin className="w-3 h-3 text-primary" />
                    {activity.location}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-1 group-hover:text-primary transition-colors">
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
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${activity.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">per person</div>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg">
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