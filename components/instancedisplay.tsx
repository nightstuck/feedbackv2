import { feedback, instance } from "@prisma/client";
import useSWR from 'swr';
import fetch from '../lib/api'

type inst = {
    id: number;
    name: string;
    secure: boolean;
    anonymous: boolean;
}

interface props {
    instance: inst | undefined
}

const InstanceDisplay = ({ instance }: props) => {
    if (!instance) return null;

    const { data, error, isLoading } = useSWR<{feedbacks: feedback[], ok: boolean}>(`/api/get/feedbacks?id=${instance.id}`, fetch, { refreshInterval: 2000});

    if (isLoading) return (
        <div className="w-full h-full flex justify-center items-center">
        <div className="w-5/6 h-5/6 animate-pulse bg-gray-dark/30 rounded-xl"></div>
        </div>
    );

    return (
        <div className="w-full flex flex-col justify-center p-5 text-gray-light">
            <ul>
                {data?.feedbacks.map((f) => (
                    <li className="flex flex-col justify-between border p-2 rounded-lg m-1 bg-black">
                        <span className="font-semibold"><u>{f.author}</u></span>
                        <span>{f.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InstanceDisplay;