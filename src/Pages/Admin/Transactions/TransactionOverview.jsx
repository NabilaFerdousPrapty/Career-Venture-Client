import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import Swal from 'sweetalert2'; // Import SweetAlert2

const TransactionOverview = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosCommon = UseAxiosCommon();

    // Fetch all payments data
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axiosCommon.get('/payments');
                setPayments(response.data); // Assuming the backend returns an array of payments
                setLoading(false);
            } catch (err) {
                setError('Failed to load payments');
                setLoading(false);
            }
        };

        fetchPayments();
    }, [axiosCommon]);

    // Approve payment function
    const approvePayment = async (id) => {
        // SweetAlert2 confirmation
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to approve this payment!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                // Call the API to approve payment
                await axiosCommon.put(`/payments/approve/${id}`, { status: 'approved' });

                // Update the state to reflect the change
                setPayments((prevPayments) =>
                    prevPayments.map((payment) =>
                        payment._id === id ? { ...payment, status: 'approved' } : payment
                    )
                );
                // Show success message
                Swal.fire('Approved!', 'The payment has been approved.', 'success');
            } catch (err) {
                setError('Failed to approve payment');
                Swal.fire('Error', 'Failed to approve payment.', 'error');
            }
        } else {
            // If user cancels, show a cancel message
            Swal.fire('Cancelled', 'The payment was not approved.', 'info');
        }
    };

    if (loading) {
        return <div>Loading payments...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="overflow-x-auto my-6">
            <div className="flex items-center gap-x-3 max-w-md mx-auto mb-3">
                <h2 className="text-lg font-medium text-primary">
                    Career Venture&apos;s Total Transaction
                </h2>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"> {payments.length}</span>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className='bg-gray-700 text-white'>
                        <th className="border  border-gray-300 px-4 py-2">Email</th>
                        <th className="border  border-gray-300 px-4 py-2">Price</th>
                        <th className="border  border-gray-300 px-4 py-2">Plan Name</th>
                        <th className="border  border-gray-300 px-4 py-2">Date</th>
                        <th className="border  border-gray-300 px-4 py-2">Status</th>
                        <th className="border  border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr className='bg-accent' key={payment._id}>
                            <td className="border text-primary border-gray-300 px-4 py-2">{payment.email}</td>
                            <td className="border text-primary border-gray-300 px-4 py-2">${payment.price}</td>
                            <td className="border text-primary border-gray-300 px-4 py-2">{payment.planName}</td>
                            <td className="border text-primary border-gray-300 px-4 py-2">{payment.date}</td>
                            <td className="border text-primary border-gray-300 px-4 py-2">{payment.status}</td>
                            <td className="border text-primary border-gray-300 px-4 py-2">
                                {payment.status === 'pending' && (
                                    <button
                                        onClick={() => approvePayment(payment._id)}
                                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionOverview;
