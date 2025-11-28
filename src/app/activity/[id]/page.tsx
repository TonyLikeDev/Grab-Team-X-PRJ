"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, Clock, Star, ArrowLeft, ChevronRight } from "lucide-react"
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
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy hoạt động</h1>
          <Button onClick={() => router.push("/")}>Quay lại trang chủ</Button>
        </div>
      </div>
    )
  }

  const handleBookNow = () => {
    setBookingData({
      activityId: activity.id,
      activityTitle: activity.title,
      activityImage: activity.image,
      activityPrice: activity.price,
      date: null,
      guests: 1,
      totalPrice: activity.price,
    })
    router.push(`/booking/${activity.id}`)
  }

  const steps = ["Chọn tour", "Đặt lịch", "Xác nhận", "Thanh toán", "Hoàn tất"]

  return (
    <div className="min-h-screen bg-background">
      <StepProgressBar currentStep={1} steps={steps} />

      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{activity.title}</h1>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span>{activity.location}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                  {activity.price.toLocaleString('vi-VN')}đ/người
                </Badge>
              </div>
            </div>

            {/* Map Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Bản đồ & Điểm đến</h2>
              <div className="bg-muted rounded-lg h-64 mb-4 flex items-center justify-center relative overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977!2d${activity.mapLocation.lng}!3d${activity.mapLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2s!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Các điểm đến:</h3>
                <div className="flex flex-wrap gap-2">
                  {activity.destinations.map((dest, idx) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {dest}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Tour Guide */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Hướng dẫn viên</h2>
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={activity.guideInfo.avatar} alt={activity.guideInfo.name} />
                  <AvatarFallback>{activity.guideInfo.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{activity.guideInfo.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{activity.guideInfo.experience}</p>
                  <p className="text-sm">{activity.guideInfo.bio}</p>
                </div>
              </div>
            </Card>

            {/* Advice Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Lời khuyên</h2>
              <ul className="space-y-2">
                {activity.advice.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Reviews */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Đánh giá</h2>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/reviews/${activity.id}`)}
                >
                  Xem tất cả
                </Button>
              </div>

              <div className="bg-primary/10 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{activity.rating}</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(activity.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.reviews} đánh giá</p>
                </div>
              </div>

              <div className="space-y-4">
                {activity.customerReviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{review.name}</h4>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {review.images.map((img, idx) => (
                              <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden">
                                <Image src={img} alt="" fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Thông tin chi tiết</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Thời gian</div>
                    <div className="font-semibold">{activity.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Địa điểm</div>
                    <div className="font-semibold">{activity.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Đánh giá</div>
                    <div className="font-semibold">{activity.rating}/5 ({activity.reviews} đánh giá)</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h4 className="font-semibold mb-2">Bao gồm:</h4>
                <ul className="space-y-1 text-sm">
                  {activity.detailedInfo.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">Không bao gồm:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {activity.detailedInfo.excluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                onClick={handleBookNow}
              >
                Đặt ngay
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
