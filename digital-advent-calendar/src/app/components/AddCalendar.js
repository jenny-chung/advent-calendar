"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCalendar({ modalOpen, onClose, addCalendar }) {

    const [calendarName, setCalendarName] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (calendarName.trim() === "") {
            alert("Please enter a calendar name to continue.");
            return;
        }

        const newCalendar = {
            id: Date.now(),
            name: calendarName
        };

        // const existingCalendars = JSON.parse(localStorage.getItem('calendars')) || [];
        // existingCalendars.push(newCalendar);
        // localStorage.setItem('calendars', JSON.stringify(existingCalendars));
        addCalendar(newCalendar);

        router.push(`/calendar/${newCalendar.id}`);

        onClose();
    };

    return (
        modalOpen && 
        
        (<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
        <div className="bg-white px-10 py-6 rounded-lg shadow-lg w-80">
            <h1 className="text-xl font-bold text-black mb-4">Create A New Calendar</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="calendarName" className="block text-sm font-medium text-black">
                        Calendar Name
                    </label>
                    <input
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
                        type="text"
                        id="calendarName"
                        value={calendarName}
                        placeholder="Enter calendar name..."
                        required
                        onChange={(e) => setCalendarName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 bg-gray-500 text-white rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="p-2 bg-green-600 text-white rounded-md"
                    >
                        Create Calendar
                    </button>
                </div>
            </form>
        </div>  
        </div>)
    )
}