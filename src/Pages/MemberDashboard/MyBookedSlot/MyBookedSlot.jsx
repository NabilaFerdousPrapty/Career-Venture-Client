import React from 'react';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const MyBookedSlot = () => {
    const { user } = UseAuth();
    const email = user?.email; // Optional chaining applied
    const axiosCommon = UseAxiosCommon();

    const { data: myBookings = [], refetch } = useQuery({
        queryKey: ["mentorData"],
        queryFn: async () => {
            if (email) { // Ensure email exists before making the request
                const { data } = await axiosCommon.get(`/mentor/slot/booked/${email}`);
                return data;
            }
            return [];
        },
        enabled: !!email, // Prevent query from running if email is null/undefined
    });

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 mt-2 text-center text-primary">My Booked Slots</h2>
            {myBookings?.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="table-auto border-collapse border border-amber-600 w-full text-left">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="border text-primary border-amber-600 px-4 py-2">#</th>
                            <th className="border text-primary border-amber-600 px-4 py-2">Mentor ID</th>
                            <th className="border text-primary border-amber-600 px-4 py-2">Date</th>
                            <th className="border text-primary border-amber-600 px-4 py-2">Booked At</th>
                        </tr>
                    </thead>
                    <tbody className='bg-accent text-primary'>
                        {myBookings?.map((booking, index) => (
                            <tr key={booking?._id}>
                                <td className="border text-primary border-amber-600 px-4 py-2">{index + 1}</td>
                                <td className="border text-primary border-amber-600 px-4 py-2">{booking?.mentor_id}</td>
                                <td className="border text-primary border-amber-600 px-4 py-2">{booking?.date}</td>
                                <td className="border text-primary border-amber-600 px-4 py-2">{new Date(booking?.bookedAt)?.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyBookedSlot;
