import { api } from "@/lib/api";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import CheckCircle from '../../public/check_circle.svg';
import CancelCircle from '../../public/cancel.svg';
import Head from "next/head";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Divider, Spinner } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import {Input} from "@nextui-org/react";

interface props {
    data: {
        instance: {
            name: string,
            id: number,
            secure: boolean,
            anonymous: boolean,
        },
        ok: boolean,
    }
}

const Embedded = ({ data }: props) => {
    const instance = data.instance;

    const [NameInput, setNameInput] = useState<string>("");
    const [FeedbackInput, setFeedbackInput] = useState<string>("");
    const [PasswordInput, setPasswordInput] = useState<string>("");

    const [PasswordCheck, setPasswordCheck] = useState<{ show: boolean, ok?: boolean, loading?:Boolean }>({show: false});

    const [ErrorOutput, setErrorOutput] = useState<{ show: boolean, text?: string, positive?: boolean }>({ show: false, positive: false });

    const sendFeedback = async () => {
        if (NameInput.trim() === "" && !instance.anonymous) return setErrorOutput({ show: true, positive: false, text: "Please fill in your name!" });
        if (FeedbackInput.trim() === "") return setErrorOutput({ show: true, positive: false, text: "You're missing your message... D:" });

        const data = await api<{ ok: boolean, error?: string }>("new/feedback", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({instance: instance, feedback: {author: NameInput, text: FeedbackInput, password: PasswordInput}})
        });
        if (data.ok) return setErrorOutput({ show: true, positive: true, text: "Feedback sent!" });
        if (data.error && data.error == "password") return setErrorOutput({ show: true, positive: false, text: "Thats the wrong password!" });
        if (data.error && data.error == "server") return setErrorOutput({ show: true, positive: false, text: "Something went wrong on the serverside." });
    }

    useEffect(() => { 
        if (PasswordInput == "") return;
        setPasswordCheck({ show: false, ok: false, loading: true });
        const checkPW = async () => {
            const data = await api<{ ok: boolean, error?: string }>("checkpw", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password: PasswordInput, instance_id: instance.id})
            });
            setPasswordCheck({show: true, ok: data.ok})
        }

        const handler = setTimeout(() => {
            checkPW();
        }, 2000);

        return () => {
            clearTimeout(handler);
        }
    }, [PasswordInput]);

    useEffect(() => { 
        setErrorOutput({show: false})
    }, [FeedbackInput, NameInput]);

    if (instance) return (
        <>
            <Head>
                <title>{ instance.name } Form</title>
            </Head>
            <main className="w-full h-screen flex flex-col items-center">
                <Card className="min-w-[400px] w-full tablet:w-[60%] p-3">
                    <CardHeader>
                        <h1 className="w-full font-bold text-3xl text-center">Send a Message!</h1>
                    </CardHeader>
                    <CardBody className="flex flex-col items-center gap-3">
                        <Divider/>
                        <div className="w-full flex flex-row justify-between gap-3">
                            {instance.secure && <div className="flex items-center gap-2 w-full ">
                                <Input variant="faded" label="Password" className="" onChange={(e) => { setPasswordInput(e.target.value) }} type="password" endContent={PasswordCheck.show ? PasswordCheck.ok ?
                                        <Image className="inline" src={CheckCircle} alt="Correct Password"></Image>
                                        :
                                        <Image className="inline" src={CancelCircle} alt="Wrong Password"></Image>
                                    :
                                    PasswordCheck.loading && <Spinner size="sm"/>
                                } />
                            </div>}
                            {instance.anonymous === false && <div className="w-full flex flex-row gap-2 pc:justify-end">
                                <Input variant="faded" label="Name" className="" onChange={(e) => { setNameInput(e.target.value) }} type="text" value={NameInput} />
                            </div>} 
                        </div>    
                        <Textarea variant="faded" label="Message" labelPlacement="inside" className="" value={FeedbackInput} onChange={(e) => { setFeedbackInput(e.target.value) }}></Textarea>
                        <Divider/>
                        {ErrorOutput.show ?
                            <span className={ErrorOutput.positive ? "h-5 text-c-green-700" : "h-6 text-red-700"}>{ErrorOutput.text}</span>
                        : <span className="h-5"></span>}
                            <Button color="primary" onClick={sendFeedback}>Send Message</Button>
                    </CardBody>
                </Card>
            </main>
        </>
    );

    return (
        <div>
            Keine Feedback Instanz gefunden
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.instance_id;
    const res = await fetch("http://localhost:3000/api/get/instance?id=" + id);
    const data = await res.json();

    return { props: { data } };
}

export default Embedded;
