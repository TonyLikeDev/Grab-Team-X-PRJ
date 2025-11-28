"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Users, MapPin, Home } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import StepProgressBar from "@/components/StepProgressBar"
import { useBookingStore } from "@/lib/booking-store"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { toast } from "sonner"

export default function ReviewBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { bookingData, setBookingData } = useBookingStore()
  
  const activity = activities.find((a) => a.id === resolvedParams.id)
  const [customerInfo, setCustomerInfo] = useState({
    name: bookingData?.customerInfo?.name || "",
    email: bookingData?.customerInfo?.email || "",
    phone: bookingData?.customerInfo?.phone || "",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  if (!activity || !bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy thông tin đặt chỗ</h1>
          <Button onClick={() => router.push("/")}>Quay lại trang chủ</Button>
        </div>
      </div>
    )
  }

  const handleContinue = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin liên hệ")
      return
    }

    if (!agreedToTerms) {
      toast.error("Vui lòng đồng ý với điều khoản và chính sách")
      return
    }

    setBookingData({
      customerInfo: customerInfo,
    })

    toast.success("Thông tin đã được xác nhận!")
    router.push(`/payment/${activity.id}`)
  }

  const steps = ["Chọn tour", "Đặt lịch", "Xác nhận", "Thanh toán", "Hoàn tất"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-accent/5">
      <StepProgressBar currentStep={3} steps={steps} />

      {/* Header with Home Button */}
      <header className="bg-gradient-to-r from-primary via-accent to-primary/90 text-primary-foreground shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-primary-foreground hover:bg-primary-foreground/20 transition-all h-11 w-11"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Xác nhận thông tin</h1>
                <p className="text-sm text-primary-foreground/90">Kiểm tra lại thông tin đặt chỗ</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-primary-foreground hover:bg-primary-foreground/20 transition-all gap-2 h-11 px-4"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold">Trang chủ</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-2 border-primary/10 hover:border-primary/30 transition-all">
              <h2 className="text-xl font-bold mb-6 text-primary">Thông tin liên hệ</h2>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    placeholder="Nguyễn Văn A"
                    className="h-12 text-base mt-2 border-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-semibold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, email: e.target.value })
                    }
                    placeholder="example@email.com"
                    className="h-12 text-base mt-2 border-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-base font-semibold">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, phone: e.target.value })
                    }
                    placeholder="0123456789"
                    className="h-12 text-base mt-2 border-2"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-lg border-2 border-primary/10">
              <h2 className="text-xl font-bold mb-6 text-primary">Chính sách & Thanh toán</h2>
              <div className="space-y-5 text-sm text-muted-foreground">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3 text-base">Chính sách hủy:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Hủy trước 7 ngày: Hoàn 100%</li>
                    <li>Hủy trước 3 ngày: Hoàn 50%</li>
                    <li>Hủy trong 3 ngày: Không hoàn tiền</li>
                  </ul>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3 text-base">Lưu ý:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Mang theo CMND/CCCD</li>
                    <li>Có mặt đúng giờ</li>
                    <li>Tuân thủ hướng dẫn an toàn</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-6 p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  Tôi đã đọc và đồng ý với các điều khoản và chính sách của công ty
                </label>
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="p-6 sticky top-4 shadow-xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 text-primary">Chi tiết đặt chỗ</h2>
              
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 shadow-md border-2 border-primary/10">
                <Image
                  src={bookingData.activityImage}
                  alt={bookingData.activityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold text-lg mb-6">{bookingData.activityTitle}</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Ngày đi</div>
                    <div className="font-semibold">
                      {bookingData.date ? format(new Date(bookingData.date), "EEEE, dd/MM/yyyy", { locale: vi }) : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Số khách</div>
                    <div className="font-semibold">{bookingData.guests} người</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Địa điểm</div>
                    <div className="font-semibold">{activity.location}</div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 pt-6 mb-6 bg-gradient-to-br from-primary/5 to-accent/5 -mx-6 px-6 py-4">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Giá tour:</span>
                    <span className="font-semibold">{bookingData.activityPrice.toLocaleString('vi-VN')}đ × {bookingData.guests}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-primary/20">
                  <span className="font-bold text-lg">Tổng cộng:</span>
                  <span className="font-bold text-3xl text-primary">
                    {bookingData.totalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleContinue}
                disabled={!agreedToTerms || !customerInfo.name || !customerInfo.email || !customerInfo.phone}
              >
                Tiếp tục thanh toán
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}