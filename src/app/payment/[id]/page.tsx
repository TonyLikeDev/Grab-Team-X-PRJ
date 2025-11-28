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
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    setProcessing(true)
    setBookingData({ paymentMethod })

    setTimeout(() => {
      setProcessing(false)
      toast.success("Payment successful!")
      router.push(`/confirmation/${activity.id}`)
    }, 2000)
  }

  const steps = ["Select Tour", "Schedule", "Confirm", "Payment", "Complete"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <StepProgressBar currentStep={4} steps={steps} />

      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-accent to-primary/90 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-white hover:bg-white/20 h-11 w-11"
                disabled={processing}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Payment</h1>
                <p className="text-sm text-white/90">Complete your booking</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-white hover:bg-white/20 gap-2 h-11 px-4"
              disabled={processing}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Payment Methods */}
          <div className="md:col-span-3 space-y-6">
            <Card className="p-8 shadow-xl border-2 hover:border-primary/30 transition-all">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Payment Method
              </h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {/* Visa/Mastercard */}
                  <label
                    htmlFor="visa"
                    className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
                      paymentMethod === "visa" ? "border-primary bg-primary/5 shadow-xl" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value="visa" id="visa" className="h-5 w-5" />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">Credit / Debit Card</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    htmlFor="bank"
                    className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
                      paymentMethod === "bank" ? "border-primary bg-primary/5 shadow-xl" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value="bank" id="bank" className="h-5 w-5" />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">Bank Transfer</div>
                        <div className="text-sm text-muted-foreground">Direct bank payment</div>
                      </div>
                    </div>
                  </label>

                  {/* Momo */}
                  <label
                    htmlFor="momo"
                    className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
                      paymentMethod === "momo" ? "border-primary bg-primary/5 shadow-xl" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value="momo" id="momo" className="h-5 w-5" />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">Digital Wallet</div>
                        <div className="text-sm text-muted-foreground">PayPal, Apple Pay, Google Pay</div>
                      </div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </Card>

            {/* Payment Form */}
            {paymentMethod === "visa" && (
              <Card className="p-8 shadow-xl border-2 border-primary/20">
                <h3 className="font-bold text-xl mb-6 text-primary">Card Details</h3>
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="cardNumber" className="text-base font-bold">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-14 text-base mt-2 border-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-base font-bold">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="h-14 text-base mt-2 border-2" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-base font-bold">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" maxLength={3} className="h-14 text-base mt-2 border-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="text-base font-bold">Cardholder Name</Label>
                    <Input id="cardName" placeholder="JOHN DOE" className="h-14 text-base mt-2 border-2" />
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <Card className="p-6 sticky top-4 shadow-xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Order Summary
              </h2>
              
              <div className="relative h-40 rounded-xl overflow-hidden mb-4 shadow-lg">
                <Image
                  src={bookingData.activityImage}
                  alt={bookingData.activityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold mb-6 text-lg">{bookingData.activityTitle}</h3>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground">Guest:</span>
                  <span className="font-bold">{bookingData.customerInfo?.name}</span>
                </div>
                <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground">Travelers:</span>
                  <span className="font-bold">{bookingData.guests} people</span>
                </div>
                <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-bold">${bookingData.activityPrice.toLocaleString()} × {bookingData.guests}</span>
                </div>
              </div>

              <div className="border-t-2 pt-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${bookingData.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white h-14 text-lg font-bold shadow-xl"
                onClick={handlePayment}
                disabled={!paymentMethod || processing}
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Complete Booking"
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500" />
                <span>Secure payment</span>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}