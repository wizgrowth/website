'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
  })
  .required()

const TIME_SLOTS: string[] = []
for (let hour = 9; hour < 17; hour++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    TIME_SLOTS.push(`${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
  }
}

export default function BookingForm() {
  type BookingDataProps = {
    name?: string
    email?: string
    date?: string
    time?: string
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)
  const [formData, setFormData] = useState<BookingDataProps | null>(null)

  // 30-minute slots from 9 AM to 5 PM, offered once a date is chosen.
  const availableTimeSlots = selectedDate ? TIME_SLOTS : []

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

  const [saving, setSaving] = useState(false)
  const [bookingError, setBookingError] = useState('')

  // The slot is saved only once name, email, date and time are all chosen,
  // and "Booked" appears only after the server says it was stored.
  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !formData) return
    setSaving(true)
    setBookingError('')
    try {
      const response = await fetch('/api/booking/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: selectedDate.toDateString(), time: selectedTime }),
      })
      if (!response.ok) throw new Error(`Booking request failed with status ${response.status}`)
      setBookingConfirmed(true)
    } catch (error) {
      console.error('Error sending booking data to backend:', error)
      setBookingError('That slot could not be saved. Please try again, or message us on WhatsApp.')
    } finally {
      setSaving(false)
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
    <section className="shell section-tight" id="book-demo" aria-label="Book a growth call">
      <div className="sec-head" style={{ marginBottom: 28 }}>
        <p className="microlabel green">Or book a slot now</p>
        <h2>
          Pick a time that <span className="fx">suits</span> you
        </h2>
        <p className="intent">
          A free 30-minute growth call with Vismaya Babu, founder of WizGrowth. Leave your name
          and email, choose a date and time, and we confirm by email.
        </p>
      </div>
      <div className="booking card">
        {!isFormSubmitted && (
          <form className="booking-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input type="text" placeholder="Enter your name" id="name" {...register('name')} />
              <p className="field-error" role="alert">
                {errors.name?.message}
              </p>
            </div>
            <div className="field">
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                placeholder="you@company.com"
                id="email"
                {...register('email')}
              />
              <p className="field-error" role="alert">
                {errors.email?.message}
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Choose a date and time
            </button>
            <p className="hint">Mon–Fri 9am–8pm, Sat–Sun 10am–5pm IST. No pitch deck, no obligation.</p>
          </form>
        )}
        {isFormSubmitted && (
          <div className="booking-picker">
            {!selectedDate && (
              <div>
                <p className="microlabel green" style={{ marginBottom: 12 }}>
                  Step 2 of 3 · Pick a date
                </p>
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={handleDateSelect}
                  fromDate={today}
                  toDate={sixMonthsFromNow}
                  className="rounded-md border"
                />
              </div>
            )}

            {selectedDate && !bookingConfirmed && (
              <div>
                <p className="microlabel green" style={{ marginBottom: 12 }}>
                  Step 3 of 3 · Pick a time on {formatDateWithYear(selectedDate)}
                </p>
                <div className="slots">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className="slot"
                      aria-pressed={time === selectedTime}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {selectedTime && (
                  <div style={{ marginTop: 22 }}>
                    <button
                      type="button"
                      onClick={handleBooking}
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? 'Saving…' : `Confirm ${selectedTime}`}
                    </button>
                    {bookingError && (
                      <p className="field-error" role="alert" style={{ marginTop: 10 }}>
                        {bookingError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {bookingConfirmed && (
              <div className="panel" style={{ margin: 0 }}>
                <span className="microlabel green">Booked</span>
                <p>
                  <strong>Your growth call is scheduled.</strong>
                  <br />
                  {selectedDate ? formatDateWithYear(selectedDate) : ''} at {selectedTime} IST.
                  We’ll confirm by email; reply to it if you need to move the slot.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        .booking{max-width:var(--reading);padding:28px}
        .booking-form{display:grid;gap:18px;max-width:420px}
        .field label{display:block;font-weight:600;font-size:14px;margin-bottom:7px}
        .field input{width:100%;font-family:var(--sans);font-size:16px;padding:13px 16px;border:1.5px solid var(--border-strong);border-radius:var(--r-m);background:var(--white);color:var(--ink)}
        .field input:focus{border-color:var(--forest);outline:none;box-shadow:0 0 0 3px rgba(15,92,66,.12)}
        .field-error{font-size:13px;color:var(--error);min-height:1.2em;margin-top:6px}
        .hint{font-size:13px;color:var(--ink-muted);margin:0}
        .booking-form .btn{justify-self:start}
        .slots{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;max-height:280px;overflow-y:auto;padding-right:4px}
        .slot{font:inherit;font-size:13.5px;font-weight:500;padding:10px 6px;border-radius:var(--r-s);border:1px solid var(--border);background:var(--paper-hi);color:var(--ink);cursor:pointer;font-feature-settings:'tnum'}
        .slot:hover{border-color:var(--forest)}
        .slot[aria-pressed='true']{background:var(--forest);border-color:var(--forest);color:var(--paper-hi)}
        @media (max-width:768px){.booking{padding:20px}.slots{grid-template-columns:repeat(3,minmax(0,1fr))}}
      `}</style>
    </section>
  )
}
