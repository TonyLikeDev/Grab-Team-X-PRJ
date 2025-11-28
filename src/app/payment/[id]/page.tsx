"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, CreditCard, Building, Smartphone, Check, Home } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import StepProgressBar from "@/components/StepProgressBar"
import { useBookingStore } from "@/lib/booking-store"
import { toast } from "sonner"

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { bookingData, setBookingData } = useBookingStore()
  
  const activity = activities.find((a) => a.id === resolvedParams.id)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [processing, setProcessing] = useState(false)

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

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán")
      return
    }

    setProcessing(true)
    setBookingData({ paymentMethod })

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      toast.success("Thanh toán thành công!")
      router.push(`/confirmation/${activity.id}`)
    }, 2000)
  }

  const steps = ["Chọn tour", "Đặt lịch", "Xác nhận", "Thanh toán", "Hoàn tất"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-accent/5">
      <StepProgressBar currentStep={4} steps={steps} />

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
                disabled={processing}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Thanh toán</h1>
                <p className="text-sm text-primary-foreground/90">Chọn phương thức thanh toán</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-primary-foreground hover:bg-primary-foreground/20 transition-all gap-2 h-11 px-4"
              disabled={processing}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold">Trang chủ</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-2 border-primary/10">
              <h2 className="text-xl font-bold mb-6 text-primary">Phương thức thanh toán</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {/* Visa/Mastercard */}
                  <label
                    htmlFor="visa"
                    className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      paymentMethod === "visa" ? "border-primary bg-primary/10 shadow-lg" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value="visa" id="visa" className="h-5 w-5" />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                        <CreditCard className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-base">Thẻ tín dụng / Ghi nợ</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard</div>
                      </div>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    htmlFor="bank"
                    className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      paymentMethod === "bank" ? "border-primary bg-primary/10 shadow-lg" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value="bank" id="bank" className="h-5 w-5" />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                        <Building className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-base">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-muted-foreground">Vietcombank, BIDV, Techcombank</div>
                      </div>
                    </div>
                  </label>

                  {/* Momo */}
                  <label
                    htmlFor="momo"
                    className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      paymentMethod === "momo" ? "border-primary bg-primary/10 shadow-lg" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value="momo" id="momo" className="h-5 w-5" />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center shadow-md">
                        <Smartphone className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-base">Ví MoMo</div>
                        <div className="text-sm text-muted-foreground">Thanh toán qua ví điện tử</div>
                      </div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </Card>

            {/* Payment Details Form */}
            {paymentMethod === "visa" && (
              <Card className="p-6 shadow-lg border-2 border-primary/10">
                <h3 className="font-bold mb-6 text-primary text-lg">Thông tin thẻ</h3>
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="cardNumber" className="text-base font-semibold">Số thẻ</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-12 text-base mt-2 border-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-base font-semibold">Ngày hết hạn</Label>
                      <Input id="expiry" placeholder="MM/YY" className="h-12 text-base mt-2 border-2" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-base font-semibold">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" maxLength={3} className="h-12 text-base mt-2 border-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="text-base font-semibold">Tên trên thẻ</Label>
                    <Input id="cardName" placeholder="NGUYEN VAN A" className="h-12 text-base mt-2 border-2" />
                  </div>
                </div>
              </Card>
            )}

            {paymentMethod === "bank" && (
              <Card className="p-6 shadow-lg border-2 border-primary/10 bg-gradient-to-br from-green-50 to-green-100/50">
                <h3 className="font-bold mb-6 text-primary text-lg">Thông tin chuyển khoản</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground">Ngân hàng:</span>
                    <span className="font-semibold">Vietcombank</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground">Số tài khoản:</span>
                    <span className="font-semibold">1234567890</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground">Chủ tài khoản:</span>
                    <span className="font-semibold">CONG TY DU LICH</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground">Nội dung:</span>
                    <span className="font-semibold">DL{activity.id.toUpperCase()}</span>
                  </div>
                </div>
              </Card>
            )}

            {paymentMethod === "momo" && (
              <Card className="p-6 shadow-lg border-2 border-primary/10 bg-gradient-to-br from-pink-50 to-pink-100/50">
                <h3 className="font-bold mb-6 text-primary text-lg">Thanh toán MoMo</h3>
                <div className="text-center space-y-4">
                  <div className="w-56 h-56 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-md border-2 border-pink-200">
                    <div className="text-muted-foreground text-lg">QR Code</div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Quét mã QR bằng ứng dụng MoMo để thanh toán
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-4 shadow-xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 text-primary">Tóm tắt đơn hàng</h2>
              
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 shadow-md border-2 border-primary/10">
                <Image
                  src={bookingData.activityImage}
                  alt={bookingData.activityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold mb-6 text-lg">{bookingData.activityTitle}</h3>

              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground font-medium">Khách hàng:</span>
                  <span className="font-semibold">{bookingData.customerInfo?.name}</span>
                </div>
                <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground font-medium">Số khách:</span>
                  <span className="font-semibold">{bookingData.guests} người</span>
                </div>
                <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground font-medium">Giá tour:</span>
                  <span className="font-semibold">{bookingData.activityPrice.toLocaleString('vi-VN')}đ × {bookingData.guests}</span>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 pt-6 mb-6 bg-gradient-to-br from-primary/5 to-accent/5 -mx-6 px-6 py-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Tổng thanh toán:</span>
                  <span className="font-bold text-3xl text-primary">
                    {bookingData.totalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePayment}
                disabled={!paymentMethod || processing}
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xử lý...
                  </span>
                ) : (
                  "Hoàn tất đặt chỗ"
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500" />
                <span>Thanh toán an toàn và bảo mật</span>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}