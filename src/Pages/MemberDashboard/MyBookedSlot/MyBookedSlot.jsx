import React from 'react';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const MyBookedSlot = () => {
    const { user } = UseAuth();
    const email = user.email;
    const axiosCommon = UseAxiosCommon();

    const { data: myBookings = [], refetch } = useQuery({
        queryKey: ["mentorData"],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/mentor/slot/booked/${email}`);
            return data;
        },
    });

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Booked Slots</h2>
            {myBookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="table-auto border-collapse border border-amber-600 w-full text-left">
                    <thead>
                        <tr className="bg-stone-600">
                            <th className="border border-amber-600 px-4 py-2">#</th>
                            <th className="border border-amber-600 px-4 py-2">Mentor ID</th>
                            <th className="border border-amber-600 px-4 py-2">Date</th>
                            <th className="border border-amber-600 px-4 py-2">Booked At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myBookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <td className="border border-amber-600 px-4 py-2">{index + 1}</td>
                                <td className="border border-amber-600 px-4 py-2">{booking.mentor_id}</td>
                                <td className="border border-amber-600 px-4 py-2">{booking.date}</td>
                                <td className="border border-amber-600 px-4 py-2">{new Date(booking.bookedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyBookedSlot;
