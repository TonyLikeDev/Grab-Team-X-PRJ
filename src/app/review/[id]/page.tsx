"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Users, MapPin, Home, Mail, Phone, User } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import StepProgressBar from "@/components/StepProgressBar"
import { useBookingStore } from "@/lib/booking-store"
import { format } from "date-fns"
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
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const handleContinue = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please fill in all contact information")
      return
    }

    if (!agreedToTerms) {
      toast.error("Please agree to terms and conditions")
      return
    }

    setBookingData({ customerInfo })
    toast.success("Information confirmed!")
    router.push(`/payment/${activity.id}`)
  }

  const steps = ["Select Tour", "Schedule", "Confirm", "Payment", "Complete"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <StepProgressBar currentStep={3} steps={steps} />

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
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Confirm Details</h1>
                <p className="text-sm text-white/90">Review your booking</p>
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

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3 space-y-6">
            <Card className="p-8 shadow-xl border-2 hover:border-primary/30 transition-all">
              <h2 className="text-2xl font-bold mb-6 text-black">
                  Contact Information
                </h2>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-base font-bold flex items-center gap-2">
                    <User className="w-4 h-4 text-black" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="John Doe"
                    className="h-14 text-base mt-2 border-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-bold flex items-center gap-2">
                    <Mail className="w-4 h-4 text-black" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="john@example.com"
                    className="h-14 text-base mt-2 border-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-base font-bold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-black" />
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="h-14 text-base mt-2 border-2"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-lg border-2 border-primary/10">
              <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl border-2 border-primary/20">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                  I agree to the terms and conditions, cancellation policy, and understand the requirements for this activity
                </label>
              </div>
            </Card>
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <Card className="p-6 sticky top-4 shadow-xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 text-black">
                Trip Summary
              </h2>
              
              <div className="relative h-40 rounded-xl overflow-hidden mb-4 shadow-lg">
                <Image
                  src={bookingData.activityImage}
                  alt={bookingData.activityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold text-lg mb-4">{bookingData.activityTitle}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div className="font-bold text-sm">
                      {bookingData.date ? format(new Date(bookingData.date), "MMM dd, yyyy") : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Guests</div>
                    <div className="font-bold text-sm">{bookingData.guests} people</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="font-bold text-sm">{activity.location}</div>
                  </div>
                </div>
              </div>

                <div className="border-t-2 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-3xl text-black">
                      {bookingData.totalPrice.toLocaleString()}đ
                    </span>
                  </div>
                </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white h-14 text-lg font-bold shadow-xl"
                onClick={handleContinue}
                disabled={!agreedToTerms || !customerInfo.name || !customerInfo.email || !customerInfo.phone}
              >
                Continue to Payment
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}