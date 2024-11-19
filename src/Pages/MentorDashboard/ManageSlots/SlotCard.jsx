import React, { useEffect } from "react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";

// React Icons
import { IoLocationOutline, IoTrashOutline, IoCreateOutline } from "react-icons/io5";
import { BsSend } from "react-icons/bs";

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
