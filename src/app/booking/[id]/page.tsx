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
      activityTitle: activity.titleEn,
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <StepProgressBar currentStep={2} steps={steps} />

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
                <h1 className="text-xl md:text-2xl font-bold text-white">Schedule Your Trip</h1>
                <p className="text-sm text-white/90">{activity.titleEn}</p>
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
          {/* Booking Form */}
          <div className="md:col-span-3 space-y-6">
            <Card className="p-8 shadow-xl border-2 hover:border-primary/30 transition-all">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <CalendarIcon className="w-7 h-7 text-primary" />
                Select Date
              </h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-16 text-lg border-2 hover:border-primary hover:bg-primary/5"
                  >
                    <CalendarIcon className="mr-3 h-6 w-6 text-primary" />
                    {date ? format(date, "PPP") : "Choose your departure date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </Card>

            <Card className="p-8 shadow-xl border-2 hover:border-primary/30 transition-all">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <Users className="w-7 h-7 text-primary" />
                Number of Guests
              </h2>
              <div className="flex items-center justify-between bg-secondary/30 p-6 rounded-xl">
                <div>
                  <div className="font-bold text-xl">Travelers</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ${activity.price.toLocaleString()} per person
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    className="h-14 w-14 border-2 hover:bg-destructive/10 hover:border-destructive"
                  >
                    <Minus className="w-6 h-6" />
                  </Button>
                  <span className="text-4xl font-bold w-20 text-center text-primary">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.min(20, guests + 1))}
                    disabled={guests >= 20}
                    className="h-14 w-14 border-2 hover:bg-primary/10 hover:border-primary"
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="md:col-span-2">
            <Card className="p-6 sticky top-4 shadow-xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Booking Summary
              </h2>
              
              <div className="relative h-40 rounded-xl overflow-hidden mb-4 shadow-lg">
                <Image
                  src={activity.image}
                  alt={activity.titleEn}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold text-lg mb-4">{activity.titleEn}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="font-bold">
                    {date ? format(date, "MMM dd, yyyy") : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Guests:</span>
                  <span className="font-bold">{guests} {guests === 1 ? 'person' : 'people'}</span>
                </div>
              </div>

              <div className="border-t-2 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${(activity.price * guests).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white h-14 text-lg font-bold shadow-xl"
                onClick={handleContinue}
                disabled={!date}
              >
                Continue
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}