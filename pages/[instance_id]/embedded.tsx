import { api } from "@/lib/api";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface props {
    data: {
        instance: {
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

    const [ErrorOutput, setErrorOutput] = useState<{ show: boolean, text?: string }>({ show: false });

    const sendFeedback = async () => {
        const data = await api<{ ok: boolean, error?: string }>("new/feedback", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({instance: instance, feedback: {author: NameInput, text: FeedbackInput, password: PasswordInput}})
        });
        if (data.ok) return setErrorOutput({ show: false });
        if (data.error && data.error == "password") return setErrorOutput({ show: true, text: "Thats the wrong password!" });
        if (data.error && data.error == "server") return setErrorOutput({ show: true, text: "Something went wrong on the serverside." });
    }

    if (instance) return (
        <div className="w-full h-full bg-white">
            <h1>Feedback Service</h1>
            {instance.secure && <div>
                <span>Password:</span>
                <input onChange={(e)=>{ setPasswordInput(e.target.value) }} type="password" />
            </div>}
            {instance.anonymous && <div>
                <input onChange={(e)=>{ setNameInput(e.target.value) }} type="text" value={"Your Name..."} />
                <button>Save name</button>
            </div>}  
            <textarea onChange={(e)=>{ setFeedbackInput(e.target.value) }} cols={30} rows={10}></textarea>
            <button onClick={sendFeedback}>Feedback senden</button>
        </div>
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
