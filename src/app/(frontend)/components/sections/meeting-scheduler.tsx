'use client'

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/buttons/button'
import { ClockIcon } from '@/components/icons/clock-icon'

export default function MeetingScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false)

  // Generate time slots when a date is selected
  useEffect(() => {
    if (!selectedDate) return

    const slots = []
    // Create 30-minute slots from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        slots.push(timeString)
      }
    }
    setAvailableTimeSlots(slots)
  }, [selectedDate])

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
    setSelectedTime(null)
    setBookingConfirmed(false)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setBookingConfirmed(false)
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      console.log('Booking confirmed for:', {
        date: selectedDate.toDateString(),
        time: selectedTime,
      })
      setBookingConfirmed(true)
    }
  }

  //   const formatDate = (date: Date) => {
  //     if (!date) return ''
  //     const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' }
  //     return date.toLocaleDateString('en-US', options)
  //   }

  const formatDateWithYear = (date: Date) => {
    if (!date) return ''
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  // Configure the date range for the calendar
  const today = new Date()
  const sixMonthsFromNow = new Date()
  sixMonthsFromNow.setMonth(today.getMonth() + 6)

  return (
    <section className="pb-20">
      <div className="container bg-primary-300 rounded-3xl py-20 px-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold leading-6 text-white">NEED HELP?</p>
            <p className="text-4xl font-extrabold leading-snug text-white">Book a Consultation</p>
          </div>
          <Button
            className="bg-primary-200 text-lg font-medium leading-7 text-primary-400 py-5 px-6 rounded-xl block w-fit"
            href="/more-about-me/"
            Btntext="More About Me"
          />
        </div>
        {/* calendar */}
        <div className="w-full mx-auto bg-white rounded-lg shadow-md mt-16 flex items-center gap-7 px-14">
          <div className="basis-2/3 pr-4 border-r border-gray-200 py-28">
            <p className="text-base leading-6 font-medium text-black">Vismaya Babu</p>
            <p className="text-2xl leading-9 font-bold text-black mt-2">Business Consultation</p>
            <div className="flex items-center gap-2 mt-4">
              <ClockIcon width="15" height="15" />
              <p className="text-sm leading-5 font-normal text-black">60 Minutes</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <ClockIcon width="15" height="15" />
              <p className="text-sm leading-5 font-normal text-black">https://vismayababu.com</p>
            </div>
            <p className="text-base leading-6 font-normal text-black mt-5">
              Book a 60-minute consultation with Vismaya Babu to get clear, actionable advice for
              your business growth. From improving your website to scaling your marketing efforts,
              let’s create a plan that works for you.
            </p>
          </div>

          <div className="flex items-center justify-center basis-1/3">
            {/* Calendar selection using shadcn/ui */}
            {!selectedDate && (
              <div>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={handleDateSelect}
                    fromDate={today}
                    toDate={sixMonthsFromNow}
                    className="rounded-md border"
                  />
                </div>
              </div>
            )}

            {/* Time slot selection */}
            {selectedDate && !bookingConfirmed && (
              <div>
                <div className="h-72 w-64 overflow-y-auto flex flex-col gap-2">
                  {availableTimeSlots.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSelect(time)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        time === selectedTime
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {/* Booking confirmation */}
                {selectedDate && selectedTime && (
                  <div className="mt-6 w-full">
                    <button
                      onClick={handleBooking}
                      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full"
                    >
                      Confirm Booking
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Success message */}
            {bookingConfirmed && (
              <div className="p-4 bg-green-100 text-green-800 rounded-md">
                <p className="font-medium">Your meeting has been scheduled!</p>
                <p>Date: {selectedDate ? formatDateWithYear(selectedDate) : ''}</p>
                <p>Time: {selectedTime}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
