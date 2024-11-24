import React from 'react';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const MyTransactions = () => {
    const { user } = UseAuth();
    const email = user.email;
    const axiosCommon = UseAxiosCommon();

    // Fetching transactions
    const { data: myTransactions = [], refetch } = useQuery({
        queryKey: ["userTransactions"],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/payments/user/${email}`);
            return data;
        },
    });

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-primary text-center mt-2">My Transactions</h2>

            {/* Display transactions in a table */}
            {myTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-amber-600 w-full">
                        <thead>
                            <tr className="bg-accent">
                                <th className="border text-primary border-amber-600 px-4 py-2">Transaction ID</th>
                                <th className="border text-primary border-amber-600 px-4 py-2">Plan Name</th>
                                <th className="border text-primary border-amber-600 px-4 py-2">Price</th>
                                <th className="border text-primary border-amber-600 px-4 py-2">Date</th>
                                <th className="border text-primary border-amber-600 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myTransactions.map((transaction) => (
                                <tr key={transaction._id} className="hover:bg-stone-600">
                                    <td className="border border-amber-600 text-primary px-4 py-2">
                                        {transaction.transactionId}
                                    </td>
                                    <td className="border border-amber-600 text-primary px-4 py-2">
                                        {transaction.planName}
                                    </td>
                                    <td className="border border-amber-600 text-primary px-4 py-2">
                                        ${transaction.price.toFixed(2)}
                                    </td>
                                    <td className="border text-primary border-amber-600 px-4 py-2">
                                        {transaction.date}
                                    </td>
                                    <td className="border text-primary border-amber-600 px-4 py-2">
                                        {transaction.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-primary">No transactions found.</p>
            )}
        </div>
    );
};

export default MyTransactions;
