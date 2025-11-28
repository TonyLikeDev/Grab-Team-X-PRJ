"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BookingData {
  activityId: string
  activityTitle: string
  activityImage: string
  activityPrice: number
  date: Date | null
  guests: number
  totalPrice: number
  customerInfo?: {
    name: string
    email: string
    phone: string
  }
  paymentMethod?: string
}

interface BookingStore {
  bookingData: BookingData | null
  setBookingData: (data: Partial<BookingData>) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookingData: null,
      setBookingData: (data) =>
        set((state) => ({
          bookingData: state.bookingData
            ? { ...state.bookingData, ...data }
            : (data as BookingData),
        })),
      clearBooking: () => set({ bookingData: null }),
    }),
    {
      name: 'booking-storage',
    }
  )
)
