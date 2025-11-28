"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CheckCircle, Calendar, Users, MapPin, Mail, Phone, User, Download, Home } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import StepProgressBar from "@/components/StepProgressBar"
import { useBookingStore } from "@/lib/booking-store"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export default function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { bookingData, clearBooking } = useBookingStore()
  
  const activity = activities.find((a) => a.id === resolvedParams.id)

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

  const bookingCode = `DL${activity.id.toUpperCase()}${Date.now().toString().slice(-6)}`

  const handleGoHome = () => {
    clearBooking()
    router.push("/")
  }

  const steps = ["Chọn tour", "Đặt lịch", "Xác nhận", "Thanh toán", "Hoàn tất"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-accent/5">
      <StepProgressBar currentStep={5} steps={steps} />

      {/* Success Header */}
      <div className="bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 py-16 shadow-xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 animate-bounce shadow-2xl">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">Đặt chỗ thành công!</h1>
          <p className="text-xl text-muted-foreground">
            Cảm ơn bạn đã đặt tour với chúng tôi
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Booking Code */}
          <Card className="p-8 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground shadow-xl border-2 border-primary">
            <div className="text-center">
              <div className="text-sm mb-3 font-medium">Mã đặt chỗ của bạn</div>
              <div className="text-4xl font-bold tracking-wider mb-3">{bookingCode}</div>
              <div className="text-sm opacity-90 leading-relaxed">
                Vui lòng lưu mã này để tra cứu đơn hàng
              </div>
            </div>
          </Card>

          {/* Customer Avatar with Message */}
          <Card className="p-6 shadow-lg border-2 border-primary/20">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-4 border-primary/20">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
                  alt="Customer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Xin chào {bookingData.customerInfo?.name}!</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chúng tôi đã gửi email xác nhận đến <span className="font-semibold text-primary">{bookingData.customerInfo?.email}</span>. 
                  Vui lòng kiểm tra hộp thư của bạn.
                </p>
              </div>
            </div>
          </Card>

          {/* Booking Details */}
          <Card className="p-6 shadow-lg border-2 border-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-primary">Chi tiết đặt chỗ</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative h-56 rounded-xl overflow-hidden shadow-md border-2 border-primary/10">
                <Image
                  src={bookingData.activityImage}
                  alt={bookingData.activityTitle}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-xl mb-2">{bookingData.activityTitle}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.location}</span>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-muted-foreground">Ngày khởi hành</div>
                      <div className="font-semibold text-base">
                        {bookingData.date ? format(new Date(bookingData.date), "EEEE, dd/MM/yyyy", { locale: vi }) : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-muted-foreground">Số khách</div>
                      <div className="font-semibold text-base">{bookingData.guests} người</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-primary/20 pt-6">
              <h3 className="font-bold mb-4 text-lg text-primary">Thông tin liên hệ</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground">Tên khách hàng</div>
                    <div className="font-semibold">{bookingData.customerInfo?.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground">Email</div>
                    <div className="font-semibold">{bookingData.customerInfo?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground">Số điện thoại</div>
                    <div className="font-semibold">{bookingData.customerInfo?.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Summary */}
          <Card className="p-6 shadow-lg border-2 border-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-primary">Tóm tắt thanh toán</h2>
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground font-medium">Giá tour:</span>
                <span className="font-semibold">{bookingData.activityPrice.toLocaleString('vi-VN')}đ × {bookingData.guests}</span>
              </div>
              <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground font-medium">Phương thức thanh toán:</span>
                <span className="font-semibold capitalize">{bookingData.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-lg">
                <span className="font-bold text-xl">Tổng đã thanh toán:</span>
                <span className="font-bold text-3xl text-primary">
                  {bookingData.totalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </Card>

          {/* Guide Info */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary/20 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">Hướng dẫn viên của bạn</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-primary/20">
                <Image
                  src={activity.guideInfo.avatar}
                  alt={activity.guideInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-xl">{activity.guideInfo.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{activity.guideInfo.experience}</div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline"
              className="flex-1 h-14 text-base font-semibold border-2 hover:bg-secondary/50 transition-all"
              onClick={() => window.print()}
            >
              <Download className="w-5 h-5 mr-2" />
              Tải xác nhận
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={handleGoHome}
            >
              <Home className="w-5 h-5 mr-2" />
              Về trang chủ
            </Button>
          </div>

          {/* Contact Info */}
          <Card className="p-6 bg-muted/50 border-2 border-primary/10">
            <p className="text-center text-sm text-muted-foreground leading-relaxed">
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email{" "}
              <a href="mailto:support@seastories.vn" className="text-primary font-semibold hover:underline">
                support@seastories.vn
              </a>{" "}
              hoặc hotline{" "}
              <a href="tel:1900123456" className="text-primary font-semibold hover:underline">
                1900 123 456
              </a>
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}