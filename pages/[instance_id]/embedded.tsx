import { api } from "@/lib/api";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import CheckCircle from '../../public/check_circle.svg';
import CancelCircle from '../../public/cancel.svg';
import Head from "next/head";

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

    const [NameInput, setNameInput] = useState<string>("Your name..");
    const [FeedbackInput, setFeedbackInput] = useState<string>("Your feedback..");
    const [PasswordInput, setPasswordInput] = useState<string>("");

    const [PasswordCheck, setPasswordCheck] = useState<{ show: boolean, ok?: boolean, loading?:Boolean }>({show: false});

    const [ErrorOutput, setErrorOutput] = useState<{ show: boolean, text?: string, positive?: boolean }>({ show: false, positive: false });

    const sendFeedback = async () => {
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
        }, 3000);

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
            <div className="w-full h-screen bg-white flex flex-col items-center">
                <div className="w-full max-w-4xl rounded-2xl flex flex-col justify-around items-center gap-4 p-5 bg-gray-superlight font-segoe text-black shadow-md shadow-black">
                    <h1 className="w-95pc font-bold text-3xl text-center border-solid border-b-2 border-black pb-3">Feedback Service</h1>
                    <div className="flex pc:flex-row justify-between gap-2 pc:gap-0 flex-col w-95pc">
                        {instance.secure && <div className="flex items-center gap-2 w-full ">
                            <span>Password:</span>
                            <input className="w-2/4 rounded-md shadow-inner-sm shadow-black p-2px" onChange={(e) => { setPasswordInput(e.target.value) }} type="password" />
                            {PasswordCheck.show ? PasswordCheck.ok ?
                                    <Image className="inline" src={CheckCircle} alt="Correct Password"></Image>
                                    :
                                    <Image className="inline" src={CancelCircle} alt="Wrong Password"></Image>
                                :
                                PasswordCheck.loading && <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green inline" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            }
                        </div>}
                        {instance.anonymous && <div className="w-full flex flex-row gap-2 pc:justify-end">
                            <span>Name:</span>
                            <input className="text-gray rounded-md shadow-inner-sm shadow-black p-2px w-2/4" onChange={(e) => { setNameInput(e.target.value) }} type="text" value={NameInput}
                                onFocus={(e) => {
                                    if (e.target.value == "Your name..") {
                                        setNameInput("");
                                        e.target.style.color = "black";  
                                    } 
                                }} onBlur={(e) => {
                                if (e.target.value == "") {
                                        setNameInput("Your name..");
                                        e.target.style.color = "rgb(132 146 166)";  
                                    } 
                            }} />
                        </div>} 
                    </div>    
                    <textarea className="text-gray w-95pc rounded-md shadow-inner-sm shadow-black" value={FeedbackInput} onChange={(e) => { setFeedbackInput(e.target.value) }}
                        onFocus={(e) => { 
                            if (e.target.value == "Your feedback..") {
                                        setFeedbackInput("");
                                        e.target.style.color = "black";  
                                    } 
                        }} onBlur={(e) => {
                                if (e.target.value == "") {
                                        setFeedbackInput("Your feedback..");
                                        e.target.style.color = "rgb(132 146 166)";  
                                    } 
                        }}></textarea>
                    {ErrorOutput.show ?
                        <span className={ErrorOutput.positive ? "h-5 text-c-green-700" : "h-6 text-red-700"}>{ErrorOutput.text}</span>
                    : <span className="h-5"></span>}
                    <button className="p-3 bg-c-green-700 text-white font-semibold rounded-xl transition duration-100 hover:translate-y-0 hover:scale-105" onClick={sendFeedback}>Send Feedback</button>
                </div>
            </div>
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
