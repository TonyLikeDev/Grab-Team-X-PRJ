"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Star } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function ReviewsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  
  const activity = activities.find((a) => a.id === resolvedParams.id)

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy hoạt động</h1>
          <Button onClick={() => router.push("/")}>Quay lại trang chủ</Button>
        </div>
      </div>
    )
  }

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 72 },
    { stars: 4, count: 24, percentage: 19 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 2, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Đánh giá</h1>
              <p className="text-sm text-primary-foreground/80">{activity.title}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Overall Rating */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-6">
              <div className="text-6xl font-bold text-primary mb-2">{activity.rating}</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(activity.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{activity.reviews} reviews</p>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-semibold">{item.stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Tất cả đánh giá</h2>
          
          {activity.customerReviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{review.name}</h4>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-3">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="relative w-32 h-32 rounded-lg overflow-hidden">
                          <Image src={img} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}