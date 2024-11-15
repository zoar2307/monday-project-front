import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DatePickerModal({ info, onUpdate }) {
    const [isCalendarOpen, setCalendarOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(info.date ? new Date(info.date) : null)
    const calendarRef = useRef()
    const labelRef = useRef()


    const handleSelect = (date) => {
        setSelectedDate(date)
        onUpdate({ date: date.toDateString() })
        setCalendarOpen(false)
    }

    const formatDisplayDate = (date) => {
        const today = new Date()
        const currentYear = today.getFullYear()

        if (date.getFullYear() === currentYear) {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
    }

    const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target) && labelRef.current &&
            !labelRef.current.contains(event.target)) {
            setCalendarOpen(false)
        }
    }

    useEffect(() => {
        if (isCalendarOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isCalendarOpen])

    return (
        <div className='label-container' style={{ position: 'relative' }}>
            <div
                ref={labelRef}
                onClick={() => setCalendarOpen(!isCalendarOpen)}
                className="date label not-header"
            >
                {selectedDate ? formatDisplayDate(selectedDate) : 'Select a Date'}
            </div>

            {isCalendarOpen && (
                <div ref={calendarRef} style={{ position: 'absolute', zIndex: 1000, right: -60 }}>
                    <DatePicker
                        labelRef={labelRef}
                        selected={selectedDate}
                        onChange={handleSelect}
                        inline
                        className="custom-datepicker-input"
                        calendarClassName="custom-calendar"
                    />
                </div>
            )}
        </div>
    )
}
