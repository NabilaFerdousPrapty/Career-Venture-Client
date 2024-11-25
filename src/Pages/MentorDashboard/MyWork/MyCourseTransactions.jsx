import React from 'react'
import UseAuth from './../../../hooks/UseAuth/UseAuth';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const MyCourseTransactions = () => {
    const { user } = UseAuth();
    const mentorEmail = user.email;
    console.log(mentorEmail);

    const axiosCommon = UseAxiosCommon();
    const { data: mentorData = {}, refetch: refetchMentor } = useQuery({
        queryKey: ["mentorData"],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/mentors/details/${mentorEmail}`);
            return data;
        },
    });
    console.log(mentorData);

    const { _id } = mentorData;

    const { data: paymentData = [], refetch: refetchPayments } = useQuery({
        queryKey: ["mentorSlots", _id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/payments/mentor/${_id}`);
            return data;
        },
        enabled: !!_id,
    });

    console.log(paymentData);



    return (
        <div className='flex flex-col justify-center items-center my-auto mt-5'>
            <div className="flex justify-center items-center text-center">
                <h1 className="text-3xl font-semibold lg:text-4xl text-primary">My Course Transactions</h1>
            </div>

            {paymentData && paymentData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-amber-600 w-full my-4">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="border bg-gray-800 text-white border-amber-600 px-4 py-2">Transaction ID</th>
                                <th className="border bg-gray-800 text-white border-amber-600 px-4 py-2">Plan Name</th>
                                <th className="border bg-gray-800 text-white border-amber-600 px-4 py-2">Price</th>
                                <th className="border bg-gray-800 text-white border-amber-600 px-4 py-2">Mentor Name</th>
                                <th className="border bg-gray-800 text-white border-amber-600 px-4 py-2">Date</th>
                                <th className="border bg-gray-800 text-white border-amber-600 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((payment) => (
                                <tr key={payment._id} className="bg-accent text-primary">
                                    <td className="border border-amber-600 px-4 py-2">{payment.transactionId}</td>
                                    <td className="border border-amber-600 px-4 py-2">{payment.planName}</td>
                                    <td className="border border-amber-600 px-4 py-2">
                                        {payment?.price !== undefined && payment?.price !== null
                                            ? `$${payment.price.toFixed(2)}`
                                            : "N/A"}
                                    </td>
                                    <td className="border border-amber-600 px-4 py-2">{payment.MentorName}</td>
                                    <td className="border border-amber-600 px-4 py-2">{payment.date}</td>
                                    <td className="border border-amber-600 px-4 py-2">{payment.status}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No transactions found.</p>
            )}
        </div>
    )
}

export default MyCourseTransactions