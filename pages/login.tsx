import Link from 'next/link'
import Layout from '../components/l_login'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import { api } from '@/lib/api';
import { useRouter } from 'next/router';

const Login: NextPageWithLayout = () => {
  const [UsernameInput, setUsernameInput] = useState<string>("");
  const [PasswordInput, setPasswordInput] = useState<string>("");
  const [ErrorOutput, setErrorOutput] = useState<{show: boolean, text?: string}>({show: false});

  const router = useRouter();

  const userInput = useCallback((inputElement:HTMLInputElement) => {
    if (inputElement) inputElement.focus();
  }, []);

  useEffect(() => { 
    setErrorOutput({show: false})
  }, [UsernameInput, PasswordInput]);

  const userLogin = async () => {
    if (UsernameInput.trim() == "") {
      return setErrorOutput({ show: true, text: "Please fill in your Username" })
    } else if (PasswordInput.trim() == "") {
      return setErrorOutput({ show: true, text: "Please fill in your Password" })
    }

    const data = await api<{ login: boolean, error: string }>("login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: UsernameInput, password: PasswordInput }) });
    if (data.login == true) return router.push(router.query.return as string || "/");
      
    let errorText;
    switch (data.error) {
      case "password":
        errorText = "Wrong password.";
        break;
      case "user":
        errorText = "Wrong username or email.";
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
        <span className='text-gray-light w-4/5'>
          Username or E-Mail
        </span>
        <input className='w-4/5 p-1 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border' tabIndex={1} ref={userInput} onChange={(e) => { setUsernameInput(e.target.value); }} onKeyDown={(e) => { if (e.key == 'Enter') userLogin(); }} type={"text"}></input>
        <span className='text-gray-light w-4/5 flex flex-row justify-between'>
          Password
          <Link className='text-gray-light hover:text-green' href={"/resetpassword"}>Forgot password?</Link>
        </span>
      <input className='w-4/5 p-1 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border' tabIndex={2} onChange={(e) => { setPasswordInput(e.target.value); }} onKeyDown={(e) => { if (e.key == 'Enter') userLogin(); }} type={"password"}></input>
        {ErrorOutput.show && <span className='w-4/5 text-gray-light bg-red-700/60 rounded-lg border border-solid border-red-500 p-1 text-center'>{ErrorOutput.text}</span>}
        <button className='w-2/5 text-gray-light border rounded-lg hover:bg-c-green-700 p-1' tabIndex={3} onClick={userLogin}>Login</button>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Login;