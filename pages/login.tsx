import NextLink from 'next/link'
import Layout from '../components/l_login'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import { api } from '@/lib/api';
import { useRouter } from 'next/router';
import { Button, Input, Link } from '@nextui-org/react';

const Login: NextPageWithLayout = () => {
  const [UsernameInput, setUsernameInput] = useState<string>("");
  const [PasswordInput, setPasswordInput] = useState<string>("");
  const [ErrorOutput, setErrorOutput] = useState<{show: boolean, text?: string}>({show: false});

  const router = useRouter();

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
    <main className='min-w-200 flex flex-col items-center gap-4'>
      <Input className='' label="Username or E-Mail" tabIndex={1} onChange={(e) => { setUsernameInput(e.target.value); }} onKeyDown={(e) => { if (e.key == 'Enter') userLogin(); }} type={"text"}/>
      <Input className='' label="Password" tabIndex={2} onChange={(e) => { setPasswordInput(e.target.value); }} onKeyDown={(e) => { if (e.key == 'Enter') userLogin(); }} type={"password"} />
      <Link className='' href={"/resetpassword"} as={NextLink}>Forgot password?</Link>
      {ErrorOutput.show && <span className='w-4/5 text-gray-light bg-red-700/60 rounded-lg border border-solid border-red-500 p-1 text-center'>{ErrorOutput.text}</span>}
      <Button color='primary' className='' tabIndex={3} onClick={userLogin}>Login</Button>
      <span>Are you new here? <Link className='' href={"/signup"} as={NextLink}>Sign Up</Link></span>
    </main>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Login;