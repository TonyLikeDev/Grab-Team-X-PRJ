"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, Clock, Star, ArrowLeft, Home, User } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import StepProgressBar from "@/components/StepProgressBar"
import { useBookingStore } from "@/lib/booking-store"

export default function ActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const setBookingData = useBookingStore((state) => state.setBookingData)
  
  const activity = activities.find((a) => a.id === resolvedParams.id)

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const handleBookNow = () => {
    setBookingData({
      activityId: activity.id,
      activityTitle: activity.titleEn,
      activityImage: activity.image,
      activityPrice: activity.price,
      date: null,
      guests: 1,
      totalPrice: activity.price,
    })
    router.push(`/booking/${activity.id}`)
  }

  const steps = ["Select Tour", "Schedule", "Confirm", "Payment", "Complete"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <StepProgressBar currentStep={1} steps={steps} />

      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-accent to-primary/90 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="text-white hover:bg-white/20 h-11 w-11"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">{activity.titleEn}</h1>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-white hover:bg-white/20 gap-2 h-11 px-4"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activity.image}
                alt={activity.titleEn}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 right-6">
                <Badge className="bg-white text-black text-xl px-6 py-3 shadow-xl font-bold">
                  {activity.price.toLocaleString()}đ/person
                </Badge>
              </div>
            </div>

            {/* Description */}
            <Card className="p-6 shadow-lg border-2 hover:border-primary/30 transition-all">
              <h2 className="text-2xl font-bold mb-4 text-black">
                  About This Experience
                </h2>
              <p className="text-black leading-relaxed whitespace-pre-wrap">{activity.descriptionEn}</p>
            </Card>

            {/* Guide */}
            <Card className="p-6 shadow-lg border-2 hover:border-primary/30 transition-all">
              <h2 className="text-2xl font-bold mb-6 text-black">
                  Your Guide
                </h2>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-4 border-primary/20 shadow-lg">
                  <AvatarImage src={activity.guideInfo.avatar} />
                  <AvatarFallback><User className="w-10 h-10" /></AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-xl">{activity.guideInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">{activity.guideInfo.experience}</p>
                  <p className="text-sm mt-2">{activity.guideInfo.bio}</p>
                </div>
              </div>
            </Card>

            {/* Reviews Preview */}
            <Card className="p-6 shadow-lg border-2 hover:border-primary/30 transition-all">
              <h2 className="text-2xl font-bold mb-6 text-black">
                  Guest Reviews
                </h2>
              <div className="flex items-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-black">{activity.rating}</div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.reviews} reviews</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push(`/reviews/${activity.id}`)}
                className="w-full border-2 hover:border-primary hover:bg-primary/10"
              >
                View All Reviews
              </Button>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4 shadow-xl border-2 border-primary/20">
              <h3 className="text-xl font-bold mb-6 text-black">
                Trip Details
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                  <Clock className="w-6 h-6 text-black" />
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-bold">{activity.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                  <MapPin className="w-6 h-6 text-black" />
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-bold">{activity.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                  <Star className="w-6 h-6 text-black" />
                  <div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="font-bold">{activity.rating}/5 ({activity.reviews} reviews)</div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 pt-6 mb-6">
                <h4 className="font-bold mb-3 text-lg">What's Included</h4>
                <ul className="space-y-2">
                  {activity.detailedInfo.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white h-14 text-lg font-bold shadow-xl"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}