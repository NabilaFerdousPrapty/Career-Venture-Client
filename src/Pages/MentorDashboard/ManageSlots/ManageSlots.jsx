import React, { useEffect, useState } from 'react'
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import Swal from 'sweetalert2';
import { IoCreateOutline, IoLocationOutline, IoTrashOutline } from 'react-icons/io5';
import { BsSend } from 'react-icons/bs';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

import 'react-clock/dist/Clock.css';
import DatePicker from 'react-datepicker';

const ManageSlots = () => {
    const { user } = UseAuth();
    const mentorEmail = user.email;
    const axiosCommon = UseAxiosCommon();
    const [newSlotData, setNewSlotData] = useState({
        day_of_week: "",
        hour: "",
        duration: 0,
        status: "available", // Default status
    });

    const { data: mentorData = {}, refetch: refetchMentor } = useQuery({
        queryKey: ["mentorData"],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/mentors/details/${mentorEmail}`);
            return data;
        },
    });
    console.log(mentorData);

    const { _id } = mentorData;

    const { data: mentorSlots = [], refetch: refetchSlots } = useQuery({
        queryKey: ["mentorSlots", _id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/mentor/slots/all/${_id}`);
            return data;
        },
        enabled: !!_id,
    });

    console.log(mentorSlots);


    const [editingSlot, setEditingSlot] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axiosCommon.delete(`/mentor/slots/${id}`);
                Swal.fire("Deleted!", "Your slot has been deleted.", "success");
                refetchSlots(); // Refetch slots after deletion
            } catch (error) {
                Swal.fire("Error", "Failed to delete slot. Try again!", "error");
            }
        }
    };
    const [time, setTime] = useState('');

    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(time);
    // console.log(formattedTime);

    const handleEdit = (slot) => {
        setEditingSlot(slot);

        setShowModal(true);
    };




    const handleAddSlot = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewSlotData({
            day_of_week: "",
            hour: "",
            duration: 0,

        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent page reload
        const updatedData = {
            day_of_week: newSlotData?.day_of_week || editingSlot.day_of_week,
            hour: formattedTime, // Ensure correct formatting
            duration: newSlotData?.duration || editingSlot.duration,
        };

        try {
            await axiosCommon.patch(`/mentor/slots/${editingSlot._id}`, updatedData);
            Swal.fire("Updated!", "Slot details have been updated.", "success");
            setEditingSlot(null);
            handleModalClose();
            refetchSlots();
        } catch (error) {
            Swal.fire("Error", "Failed to update slot. Try again!", "error");
        }
    };

    const handleSlotChange = (field, value) => {
        setNewSlotData((prev) => ({ ...prev, [field]: value }));
    };
    const handleSlotSubmit = async (event) => {
        event.preventDefault();

        const slotData = {
            mentor_id: _id, // Include mentor ID
            day_of_week: newSlotData.day_of_week,
            hour: formattedTime,
            duration: newSlotData.duration,
            status: "available", // Fallback to default if not set
        };

        console.log(slotData);

        try {
            await axiosCommon.post(`/mentor/slots/${_id}`, slotData);
            Swal.fire("Success", "Slot added successfully!", "success");
            refetchSlots(); // Refetch slots after adding
            handleModalClose();
        } catch (error) {
            Swal.fire("Error", "Failed to add slot. Try again!", "error");
        }
    };





    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-blue-800 mb-4">Manage Slots</h1>
            <button
                onClick={handleAddSlot}
                className="px-4 py-2 mb-4 bg-blue-700 text-white rounded-xl hover:bg-blue-600"
            >
                Add Slot
            </button>
            <div className="grid grid-cols-1 gap-4">
                {mentorSlots.map((slot) => (
                    <SlotCard key={slot._id} slot={slot} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>
            {/* Modal for Adding Slot */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-blue-800">
                            {editingSlot ? "Edit Slot" : "Add Slot"}
                        </h2>
                        <form onSubmit={editingSlot ? handleUpdate : handleSlotSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Day of the Week</label>
                                <select
                                    value={editingSlot?.day_of_week || newSlotData?.day_of_week || ""}
                                    onChange={(e) =>
                                        handleSlotChange("day_of_week", e.target.value)
                                    }
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Hour</label>
                                <DatePicker
                                    selected={time}
                                    onChange={(date) => setTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Duration (in hours)</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={editingSlot?.duration || newSlotData?.duration || ""}
                                    onChange={(e) => handleSlotChange("duration", e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="px-4 py-2 bg-gray-500 text-white rounded mr-2 hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
                                >
                                    {editingSlot ? "Update Slot" : "Add Slot"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

const SlotCard = ({ slot, onEdit, onDelete }) => {
    const { day_of_week, hour, duration, status } = slot;

    return (
        <div className="bg-blue-50 w-full justify-between rounded-xl flex">
            {/* Left side */}
            <div className="flex flex-col p-[15px] lg:p-[20px] gap-[18px]">
                <h1 className="text-[1rem] lg:text-[1.3rem] font-bold text-blue-800">{day_of_week}</h1>
                <div className="flex items-center gap-[10px]">
                    <BsSend className="p-[8px] lg:p-[10px] rounded-xl bg-blue-100 text-blue-800 text-[2rem] lg:text-[3rem]" />
                    <div>
                        <h4 className="text-[0.8rem] lg:text-[1.1rem] font-[600] text-gray-800">Hour</h4>
                        <p className="text-[0.6rem] lg:text-[0.9rem] font-[400] text-gray-500">{hour}</p>
                    </div>
                </div>
                <div className="flex items-center gap-[10px]">
                    <IoLocationOutline className="p-[8px] lg:p-[10px] rounded-xl bg-blue-100 text-blue-800 text-[2rem] lg:text-[3rem]" />
                    <div>
                        <h4 className="text-[0.8rem] lg:text-[1.1rem] font-[600] text-gray-800">Duration</h4>
                        <p className="text-[0.6rem] lg:text-[0.9rem] font-[400] text-gray-500">{duration} hour(s)</p>
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col justify-between relative w-[45%] lg:w-[40%] items-center border-l-[2px] p-[15px] lg:p-[20px] border-dashed border-gray-200">
                {/* Edit and Delete Buttons */}
                <div className="flex gap-2">
                    <IoCreateOutline
                        className="text-blue-800 text-[1.5rem] cursor-pointer"
                        onClick={() => onEdit(slot)}
                    />
                    <IoTrashOutline
                        className="text-red-600 text-[1.5rem] cursor-pointer"
                        onClick={() => onDelete(slot._id)}
                    />
                </div>
                <h4 className="text-[0.9rem] lg:text-[1.3rem] font-bold text-blue-800">{status}</h4>
                <p className="text-[0.9rem] lg:text-[1.1rem] text-gray-500">Status: <span className="font-semibold">{status}</span></p>
            </div>
        </div>
    );
};


export default ManageSlots;