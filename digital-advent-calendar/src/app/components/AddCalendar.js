"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

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
            name: calendarName,
            date: new Date().toLocaleString()
        };

        // const existingCalendars = JSON.parse(localStorage.getItem('calendars')) || [];
        // existingCalendars.push(newCalendar);
        // localStorage.setItem('calendars', JSON.stringify(existingCalendars));
        addCalendar(newCalendar);

        // Show success toast upon calendar creation
        toast.success(`Calendar ${calendarName} created successfully!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        });

        setCalendarName("");
        onClose();

        // Redirect to calendar page
        setTimeout(() => {
            router.push(`/calendar/${newCalendar.id}`);
        }, 3500); 
    };

    return (
        modalOpen && 
        
        (<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
        <div className="bg-white px-10 p-6 rounded-lg shadow-lg w-100">
            <h1 className="text-center text-xl font-bold text-black mb-4">Create A New Calendar</h1>
            <form onSubmit={handleSubmit}>

                <div className="flex items-center mb-6 space-x-4">
                    <label htmlFor="calendarName" className="block text-md font-semi-bold text-black">
                        Calendar Name:
                    </label>
                    <input
                        className="flex-grow p-2 border border-gray-300 rounded-md text-black"
                        type="text"
                        id="calendarName"
                        value={calendarName}
                        placeholder="Enter calendar name..."
                        required
                        onChange={(e) => setCalendarName(e.target.value)}
                    />
                </div>
                <div className="flex justify-between gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="p-2 bg-caribbean hover:bg-midnight text-white rounded-md flex-1"
                    >
                        Create Calendar
                    </button>
                </div>
            </form>
        </div>  
        </div>)
    )
}