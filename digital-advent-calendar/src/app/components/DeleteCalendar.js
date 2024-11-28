"use client";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

export default function DeleteCalendar({ calendarToDelete, isOpen, onClose, onDelete }) {

    const handleDelete = () => {
    
        onDelete(calendarToDelete.id);

        // Show success toast upon calendar deletion
        toast.success(`${calendarToDelete.name} was deleted successfully!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        });

        // Close modal after
        onClose();
    };

    return (
        isOpen && 
        
        (<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
        <div className="bg-white px-10 p-6 rounded-lg shadow-lg w-100">
            <h1 className="text-center text-xl font-bold text-black mb-4">Confirm Deletion</h1>
          
                <div className="flex items-center mb-6 space-x-4">
                   <p className="text-black">Are you sure you want to delete calendar: {calendarToDelete?.name}</p>
                </div>

                <div className="mt-4 flex justify-end gap-4">
                    <button
                        onClick={(e) => { e.preventDefault(); onClose(); }}
                        className="p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        className="p-2 bg-caribbean hover:bg-midnight text-white rounded-md flex-1"
                        onClick={(e) => { e.preventDefault(); handleDelete(); }}
                    >
                        Confirm
                    </button>
                </div>
 
        </div>  
        </div>)
    )
}