import React, {useEffect, useState} from 'react';
import { Monitor, MousePointer, Headphones } from 'lucide-react';
import axios from "axios";

const Card = ({ name, email, issued, photo, empId }) => {
    const [assetsCount, setAssetsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Agar employee ID available hai tabhi data lao
        if (empId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoading(true); // Loading start

            // Axios call to your Java Backend
            // Yahaan par Path Variable use ho raha hai: /{empId}/tracks
            axios.get(`http://localhost:8080/emps/count/${empId}/tracks`)
                .then(response => {
                    // Response me assets ki ginti aani chahiye.
                    // Agar Java se direct number aa raha hai, to theek hai.
                    // Agar response.data ek array hai, toh hum array ki length use karenge:
                    const count = Array.isArray(response.data) ? response.data.length : response.data;

                    setAssetsCount(count);
                })
                .catch(error => {
                    console.error(`Error fetching assets for ${empId}:`, error);
                    setAssetsCount('?'); // Error hone par ? dikha do
                })
                .finally(() => {
                    setIsLoading(false); // Loading khatam
                });
        }
    }, [empId]); // empId change hone par ye effect dobara chalega (Agar aap id use karein)

    // Jo 'issued' prop App.jsx se aa raha tha, usko ab use nahi karenge
    // Hum ab 'assetsCount' use karenge
    return (
        // Flex container centering the card content
        <div className="mt-5 flex w-80 flex-col items-center rounded-xl border border-dashed border-slate-700 bg-slate-800 p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-blue-500/10">

            {/* Image Area with Gradient Ring */}
            <div className="relative mb-4">

                <img
                    className="relative h-32 w-32 rounded-full border-2 border-slate-900 bg-slate-700 object-cover"
                    src="#"
                    alt="User Profile"
                />
            </div>

            {/* Text Info */}
            <h1 className="text-xl font-bold text-white">{name}</h1>
            <h2 className="mb-4 text-sm font-medium text-blue-400">{email}</h2>

            {/* Divider */}
            <div className="mb-4 h-px w-full bg-slate-700"></div>

            {/* Assets Section */}
            <div className="w-full">
                <div className="flex items-center justify-between rounded-lg bg-slate-900/50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-300">Assets Issued :</span>
                    <span className="rounded bg-blue-500/10 px-2 py-1 text-sm font-bold text-blue-400">
            {isLoading ? '...' : assetsCount} {/* Loading hone par '...' dikhao */}
          </span>
                </div>


            </div>
        </div>
    );
};

export default Card;