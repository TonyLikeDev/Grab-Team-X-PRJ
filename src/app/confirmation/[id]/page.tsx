"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CheckCircle, Calendar, Users, MapPin, Mail, Phone, User, Home, Sparkles } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import StepProgressBar from "@/components/StepProgressBar"
import { useBookingStore } from "@/lib/booking-store"
import { format } from "date-fns"

export default function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { bookingData, clearBooking } = useBookingStore()
  
  const activity = activities.find((a) => a.id === resolvedParams.id)

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

  const bookingCode = `SEA${activity.id.toUpperCase()}${Date.now().toString().slice(-6)}`

  const handleGoHome = () => {
    clearBooking()
    router.push("/")
  }

  const steps = ["Select Tour", "Schedule", "Confirm", "Payment", "Complete"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <StepProgressBar currentStep={5} steps={steps} />

      {/* Success Header */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary/90 py-16 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-white rounded-full mb-6 animate-bounce shadow-2xl">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Booking Confirmed!</h1>
          <p className="text-xl text-white/90 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            Your adventure awaits
            <Sparkles className="w-6 h-6" />
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Booking Code */}
          <Card className="p-8 bg-gradient-to-r from-primary to-accent text-white shadow-2xl border-0">
            <div className="text-center">
              <div className="text-sm mb-3 font-semibold opacity-90">Your Booking Code</div>
              <div className="text-5xl font-bold tracking-wider mb-3">{bookingCode}</div>
              <div className="text-sm opacity-90">
                Save this code for reference
              </div>
            </div>
          </Card>

          {/* Booking Details */}
          <Card className="p-8 shadow-xl border-2 border-primary/20">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trip Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={bookingData.activityImage}
                  alt={bookingData.activityTitle}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-2xl mb-2">{bookingData.activityTitle}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.location}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                    <Calendar className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-bold">
                        {bookingData.date ? format(new Date(bookingData.date), "MMMM dd, yyyy") : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                    <Users className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Guests</div>
                      <div className="font-bold">{bookingData.guests} people</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 pt-6">
              <h3 className="font-bold mb-4 text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Contact Information
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Name</div>
                    <div className="font-bold text-sm">{bookingData.customerInfo?.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-bold text-sm">{bookingData.customerInfo?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-bold text-sm">{bookingData.customerInfo?.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Summary */}
          <Card className="p-8 shadow-xl border-2 border-primary/20">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Payment Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between p-4 bg-secondary/50 rounded-xl">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-bold capitalize">{bookingData.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                <span className="font-bold text-xl">Total Paid:</span>
                <span className="font-bold text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ${bookingData.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Action Button */}
          <Button 
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white h-16 text-xl font-bold shadow-xl"
            onClick={handleGoHome}
          >
            <Home className="w-6 h-6 mr-2" />
            Back to Home
          </Button>

          {/* Contact Info */}
          <Card className="p-6 bg-muted/50 border-2 border-primary/10">
            <p className="text-center text-sm text-muted-foreground leading-relaxed">
              Questions? Contact us at{" "}
              <a href="mailto:hello@seastories.com" className="text-primary font-bold hover:underline">
                hello@seastories.com
              </a>{" "}
              or call{" "}
              <a href="tel:18005551234" className="text-primary font-bold hover:underline">
                1-800-555-1234
              </a>
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}