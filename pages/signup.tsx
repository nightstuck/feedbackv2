import type { NextPageWithLayout } from './_app'
import Layout from '../components/l_login'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/api';
import {useRouter} from 'next/router';

const Login: NextPageWithLayout = () => {
    const [UsernameInput, setUsernameInput] = useState<string>("");
    const [EmailInput, setEmailInput] = useState<string>("");
    const [PasswordInput, setPasswordInput] = useState<string>("");
    const [RetypeInput, setRetypeInput] = useState<string>("");
    const [ErrorOutput, setErrorOutput] = useState<{ show: boolean, text?: string }>({ show: false });

    const router = useRouter();

    const userInput = useCallback((inputElement:HTMLInputElement) => {
        if (inputElement) inputElement.focus();
    }, []);

    useEffect(() => { 
        if (PasswordInput.length < 8) return setErrorOutput({ show: true, text: "Your Password is too short!" })
        return setErrorOutput({ show: false})
    }, [PasswordInput]);

    useEffect(() => { 
        if (RetypeInput != PasswordInput && PasswordInput.length >= 8) return setErrorOutput({ show: true, text: "Your Passwords are not the same!" })
        return setErrorOutput({ show: false})
    }, [RetypeInput]);

    const userSignUp = async () => {
        if (UsernameInput.trim() == "") return setErrorOutput({ show: true, text: "Please fill in a username." });
        if (EmailInput.trim() == "") return setErrorOutput({ show: true, text: "Please fill in a valid E-Mail." });
        if (PasswordInput.trim() == "") return setErrorOutput({ show: true, text: "Please fill in a password." });
        if (RetypeInput != PasswordInput) return setErrorOutput({show: true, text: "Your Passwords are not the same!"})

        const data = await api<{ signup: boolean, error: string }>("signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: UsernameInput, email:EmailInput, password: PasswordInput }) });
        if (data.signup == true) return router.push("/login");

        let errorText;
        switch (data.error) {
        case "email":
            errorText = "That E-Mail is already registered.";
            break;
        case "user":
            errorText = "That username already exists.";
            break;
        case "method":
            errorText = "There is an error in this page's Code...";
            break;
        
        default:
            break;
        }
        return setErrorOutput({ show: true, text: errorText });
    }

    return (
        <>
            <span className='text-gray-light w-4/5'>Username</span>
            <input className='w-4/5 p-1 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border' tabIndex={1} ref={userInput} onChange={(e) => { setUsernameInput(e.target.value); }} type={"text"}></input>
            <span className='text-gray-light w-4/5'>E-Mail</span>
            <input className='w-4/5 p-1 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border' tabIndex={2} onChange={(e) => { setEmailInput(e.target.value); }} type={"text"}></input>
            <span className='text-gray-light w-4/5 flex flex-row justify-between'>Password</span>
            <input className='w-4/5 p-1 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border' tabIndex={3} onChange={(e) => { setPasswordInput(e.target.value); }} type={"password"}></input>
            <span className='text-gray-light w-4/5 flex flex-row justify-between'>Re-type password</span>
            <input className='w-4/5 p-1 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border' tabIndex={3} onChange={(e) => { setRetypeInput(e.target.value); }} type={"password"}></input>
            {ErrorOutput.show && <span className='w-4/5 text-gray-light bg-red-700/60 rounded-lg border border-solid border-red-500 p-1 text-center'>{ErrorOutput.text}</span>}
            <button className='w-2/5 text-gray-light border rounded-lg hover:bg-c-green-700 p-1' tabIndex={4} onClick={userSignUp}>Sign up</button>
        </>
    );
}

Login.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>{page}</Layout>
    )
}

export default Login;