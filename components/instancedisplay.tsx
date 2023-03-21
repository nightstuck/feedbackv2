import { api } from "@/lib/api";
import { feedback, instance } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
    instance: instance | undefined
}

const InstanceDisplay = ({ instance }: props) => {
    const [Feedbacks, setFeedbacks] = useState<feedback[]>([]);

    useEffect(() => {
        const getFeedbacks = async () => {
            const data = await api<{ ok: boolean, feedbacks: feedback[] }>("get/feedbacks", {
                method: 'POST',
                headers: {
                    "Method-Type":"application/json"
                },
                body: JSON.stringify({ instance_id: instance?.id })
            });
            setFeedbacks(data.feedbacks);
        }
        if (instance) getFeedbacks();
     }, []);

    if (instance == undefined) return null;

    return (
        <div className="w-full flex flex-col justify-center">
            <h1>{instance.name}</h1>
            <Link target={"_blank"} href={`/${instance.id}/overview`}>Feedback Overview</Link>
            <Link target={"_blank"} href={`/${instance.id}/embedded`}>Feedback embedded</Link>
        </div>
    );
}

export default InstanceDisplay;