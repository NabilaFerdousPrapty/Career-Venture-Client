import React from 'react';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const MyWishlist = () => {
    const { user } = UseAuth();
    const { email } = user;
    const userEmail = email;

    const axiosCommon = UseAxiosCommon();
    const { data: myWishList = [], refetch: wishlistRefetch } = useQuery({
        queryKey: ["myWishList"],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/wishlist/${userEmail}`);
            return data;
        },
    });

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            {myWishList.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-accent ">
                            <th className="border text-primary border-gray-300 px-4 py-2 text-left">BootCamp Name</th>
                            <th className="border text-primary border-gray-300 px-4 py-2 text-left">Price</th>
                            <th className="border text-primary border-gray-300 px-4 py-2 text-left">Mentors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myWishList.map((item) => (
                            <tr key={item._id} className="hover:bg-amber-500">
                                <td className="border text-primary border-gray-300 px-4 py-2">
                                    {item.bootCampName}
                                </td>
                                <td className="border text-primary border-gray-300 px-4 py-2">
                                    ${item.bootCampPrice}
                                </td>
                                <td className="border text-primary border-gray-300 px-4 py-2">
                                    <ul>
                                        {item.bootCampMentors.map((mentor, index) => (
                                            <li key={index} className="mb-1">
                                                <span className="font-semibold text-primary">{mentor.name}</span> - {mentor.experience} ({mentor.expertise})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-primary">Your wishlist is currently empty.</p>
            )}
        </div>
    );
};

export default MyWishlist;
