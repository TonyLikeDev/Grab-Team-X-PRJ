"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, Clock, Star, Users, Search } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActivities = activities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">SEA STORIES</h1>
                <p className="text-sm text-primary-foreground/80">Khám phá Việt Nam</p>
              </div>
            </div>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Users className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm hoạt động du lịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-primary-foreground text-foreground"
            />
          </div>
        </div>
      </header>

      {/* Activities List */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Hoạt động ngoài trời</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => router.push(`/activity/${activity.id}`)}
            >
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="hidden sm:inline">{activity.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-foreground line-clamp-1">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{activity.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {activity.price.toLocaleString('vi-VN')}đ
                      </div>
                      <div className="text-xs text-muted-foreground">/người</div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Xem thêm
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Không tìm thấy hoạt động phù hợp</p>
          </div>
        )}
      </main>
    </div>
  )
}