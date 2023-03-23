import { feedback, instance } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import OpenInNew from '../public/open_in_new.svg';
import { Tooltip } from "react-tooltip";
import useSWR from 'swr';
import fetch from '../lib/api'

interface props {
    instance: instance | undefined
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
        <div className="w-full flex flex-col justify-center p-5">
            <div className="flex flex-row justify-between p-2">
                <div className="flex flex-row gap-3">
                    <h1 className="font-semibold">{instance.name}</h1>
                    <span>Feedbacks: <span className="font-semibold">{data?.feedbacks.length}</span></span>
                </div>
                <div className="flex flex-row gap-3">
                    <Link id="link-overview" className="hover:text-green flex flex-row items-center" target={"_blank"} href={`/${instance.id}/overview`}>Feedback Overview<Image className="inline scale-75" src={OpenInNew} alt=""></Image></Link>
                    <Tooltip anchorSelect="#link-overview" content="Open the Feedback Viewer" />    
                    <Link id="link-embedded" className="hover:text-green flex flex-row items-center" target={"_blank"} href={`/${instance.id}/embedded`}>Feedback embedded<Image className="inline scale-75" src={OpenInNew} alt=""></Image></Link>
                    <Tooltip anchorSelect="#link-embedded" content="Open the Feedback Form" />  
                </div>
            </div>
            <ul>
                {data?.feedbacks.map((f) => (
                    <li className="flex flex-col justify-between border p-2 rounded-lg m-1">
                        <span className="font-semibold"><u>{f.author}</u></span>
                        <span>{f.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InstanceDisplay;