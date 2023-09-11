import { feedback, instance } from "@prisma/client";
import useSWR from 'swr';
import Image from "next/image";
import fetch from '../lib/api'
import i_delete from "../public/delete.svg"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";

type inst = {
    id: number;
    name: string;
    secure: boolean;
    anonymous: boolean;
}

interface props {
    instance: inst | undefined;
    access_key: string | undefined;
    admin: boolean;
}

const InstanceDisplay = ({ instance, access_key, admin }: props) => {
    if (!instance) return null;

    const { data, error, isLoading } = useSWR<{feedbacks: feedback[], ok: boolean}>(`/api/get/feedbacks?id=${instance.id}&key=${access_key}`, fetch, { refreshInterval: 2000});

    if (isLoading) return (
        <div className="w-full h-full flex justify-center items-center">
        <div className="w-5/6 h-5/6 animate-pulse bg-gray-dark/30 rounded-xl"></div>
        </div>
    );

    if (!data?.ok) return (
        <main className="w-full h-full flex justify-center p-10">
            <p className="text-gray-light">Access Denied.</p>
        </main>
    );

    return (
        <ul className="flex flex-col gap-3">
            {data?.feedbacks.map((f) => (
                <li key={f.id} className="">
                    <Card >
                        <CardHeader>
                            <span className="w-full flex justify-between items-center">
                                {instance.anonymous === false && <span className="font-semibold">{f.author}</span>}
                                <span className="flex gap-2 items-center">
                                    <i className="hidden sp:block">{new Date(f.timestamp).toUTCString()}</i>
                                    {admin && <>
                                        <Button isIconOnly color="danger" variant="ghost" startContent={<Image src={i_delete} alt=""></Image>}></Button>
                                        <Button color="warning" variant="ghost">Live</Button>
                                    </>}
                                </span>
                            </span>
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                            <span>{f.text}</span>
                        </CardBody>
                        <Divider className="sp:hidden"/>
                        <CardFooter className="sp:hidden">
                            <i>{new Date(f.timestamp).toUTCString()}</i>
                        </CardFooter>
                    </Card>
                </li>
            ))}
        </ul>
    );
}

export default InstanceDisplay;