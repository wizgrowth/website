'use client'

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { ClockIcon } from '@/components/icons/clock-icon'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
  })
  .required()

export default function MeetingScheduler() {
  type BookingDataProps = {
    name?: string
    email?: string
    date?: string
    time?: string
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)
  const [formData, setFormData] = useState<BookingDataProps | null>(null)

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
      setFormData((prevData) => ({
        ...prevData,
        date: selectedDate.toDateString(),
        time: selectedTime,
      }))
      setBookingConfirmed(true)
    }
  }

  useEffect(() => {
    async function addBookingDataToBackend() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/booking/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
        console.log('Response from backend:', data)
        setIsFormSubmitted(true)
      } catch (error) {
        console.error('Error sending booking data to backend:', error)
      }
    }
    if (formData) {
      addBookingDataToBackend()
    }
  }, [formData])

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  // Form submission handler
  type FormData = {
    name: string
    email: string
  }

  const onSubmit = (data: FormData) => {
    setFormData(() => {
      return {
        ...data,
      }
    })
    setIsFormSubmitted(true)
  }

  return (
    <section className="pb-20" id="book-demo">
      <div className="container ">
        <div className="bg-primary-300 rounded-3xl py-20 px-20 max-md:px-5">
          <div className="flex items-center justify-between max-lg:flex-col max-lg:gap-10">
            <div>
              <p className="text-sm font-bold leading-6 text-white max-lg:text-center">
                NEED HELP?
              </p>
              <p className="text-4xl font-extrabold leading-snug text-white max-lg:text-center">
                Book a Consultation
              </p>
            </div>
            {/* <Button
              className="bg-primary-200 text-lg font-medium leading-7 text-primary-400 py-5 px-6 rounded-xl block w-fit"
              href="/more-about-me/"
              Btntext="More About Me"
            /> */}
          </div>
          {/* calendar */}
          <div className="w-full mx-auto bg-white rounded-lg shadow-md mt-16 flex items-center gap-7 px-14 max-lg:flex-col max-sm:px-5">
            <div className="basis-2/3 pr-4 border-r border-gray-200 py-28 max-lg:pt-16 max-lg:pb-4 max-lg:border-r-0 max-lg:basis-full">
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
            {!isFormSubmitted && (
              <form className="flex flex-col gap-4 pr-4 py-28 basis-1/3 max-lg:basis-full max-lg:w-full max-lg:pb-16 max-lg:pt-0 max-lg:pr-0">
                <div className="flex flex-col gap-1 relative">
                  <label htmlFor="name" className="text-sm font-medium leading-6 text-black">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="border rounded-md p-2"
                    id="name"
                    {...register('name')}
                  />
                  <p className="text-red-500 text-xs absolute -bottom-4">{errors.name?.message}</p>
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label htmlFor="email" className="text-sm font-medium leading-6 text-black">
                    Your Email*
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="border rounded-md p-2"
                    id="email"
                    {...register('email')}
                  />
                  <p className="text-red-500 text-xs absolute -bottom-4">{errors.email?.message}</p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            )}
            {isFormSubmitted && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
