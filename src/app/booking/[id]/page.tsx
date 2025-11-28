"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar as CalendarIcon, Users, Minus, Plus, Home } from "lucide-react"
import { activities } from "@/lib/activities-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import StepProgressBar from "@/components/StepProgressBar"
import { useBookingStore } from "@/lib/booking-store"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { toast } from "sonner"

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { bookingData, setBookingData } = useBookingStore()
  
  const activity = activities.find((a) => a.id === resolvedParams.id)
  const [date, setDate] = useState<Date | undefined>(bookingData?.date || undefined)
  const [guests, setGuests] = useState(bookingData?.guests || 1)

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

  const handleContinue = () => {
    if (!date) {
      toast.error("Please select a date to continue")
      return
    }

    setBookingData({
      activityId: activity.id,
      activityTitle: activity.title,
      activityImage: activity.image,
      activityPrice: activity.price,
      date: date,
      guests: guests,
      totalPrice: activity.price * guests,
    })

    toast.success("Booking information saved!")
    router.push(`/review/${activity.id}`)
  }

  const steps = ["Select Tour", "Schedule", "Confirm", "Payment", "Complete"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-accent/5">
      <StepProgressBar currentStep={2} steps={steps} />

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
                <h1 className="text-xl md:text-2xl font-bold">Booking</h1>
                <p className="text-sm text-primary-foreground/90">{activity.title}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-primary-foreground hover:bg-primary-foreground/20 transition-all gap-2 h-11 px-4"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold">Home</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-2 border-primary/10 hover:border-primary/30 transition-all">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                <CalendarIcon className="w-6 h-6" />
                Select Date
              </h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-14 text-base border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                    {date ? format(date, "PPP") : "Select departure date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
            </Card>

            <Card className="p-6 shadow-lg border-2 border-primary/10 hover:border-primary/30 transition-all">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                <Users className="w-6 h-6" />
                Number of Guests
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">Guests</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ${activity.price.toLocaleString()}/person
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    className="h-12 w-12 border-2 hover:bg-destructive/10 hover:border-destructive disabled:opacity-30 transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="text-3xl font-bold w-16 text-center text-primary">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.min(20, guests + 1))}
                    disabled={guests >= 20}
                    className="h-12 w-12 border-2 hover:bg-primary/10 hover:border-primary disabled:opacity-30 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary/20 shadow-lg">
              <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Activity Duration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{activity.detailedInfo.schedule}</p>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="p-6 sticky top-4 shadow-xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 text-primary">Booking Summary</h2>
              
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 shadow-md border-2 border-primary/10">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold text-lg mb-6">{activity.title}</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground font-medium">Departure Date:</span>
                  <span className="font-semibold">
                    {date ? format(date, "MM/dd/yyyy") : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between text-sm p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground font-medium">Guests:</span>
                  <span className="font-semibold">{guests} {guests === 1 ? 'person' : 'people'}</span>
                </div>
                <div className="flex justify-between text-sm p-3 bg-secondary/30 rounded-lg">
                  <span className="text-muted-foreground font-medium">Price/person:</span>
                  <span className="font-semibold">${activity.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 pt-6 mb-6 bg-gradient-to-br from-primary/5 to-accent/5 -mx-6 px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-3xl text-primary">
                    ${(activity.price * guests).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleContinue}
                disabled={!date}
              >
                Continue Booking
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}