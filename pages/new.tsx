import { api } from '@/lib/api';
import { instance } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/l_home'
import type { NextPageWithLayout } from './_app'
import Head from 'next/head';

const Home: NextPageWithLayout = () => {
  const [CheckboxSecure, setCheckboxSecure] = useState<boolean>(false);
  const [CheckboxAnonymous, setCheckboxAnonymous] = useState<boolean>(false);
  const [NameInput, setNameInput] = useState<string>("");
  const [PasswordInput, setPasswordInput] = useState<string>("");
  const [RetypeInput, setRetypeInput] = useState<string>("");
  const [ErrorOutput, setErrorOutput] = useState<{ show: boolean, text?: string }>({ show: false });
  
  const router = useRouter();

  const createNewInstance = async () => {
    if (checkInputs() != true) return;
    const data = await api<{ ok: boolean, instance?: instance, error?: string }>("new/instance", {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name: NameInput, anonymous: CheckboxAnonymous, secure: CheckboxSecure, identifier: RetypeInput})
    });
    if (!data.ok && data.error == "name") return setErrorOutput({ show: true, text: "You already have an instance with that name." });
    if (data.ok) router.push(`/dashboard?i=${data.instance?.id}`);
  }

  const checkInputs = () => {
    setErrorOutput({show:false})
    if (NameInput.trim().length < 5 && NameInput.trim().length > 0) return setErrorOutput({ show: true, text: "Your name is too short!" });
    if (CheckboxSecure && PasswordInput.trim().length == 0) return setErrorOutput({ show: true, text: "Please provide a password." });
    if (CheckboxSecure && PasswordInput.trim().length < 8) return setErrorOutput({ show: true, text: "Your password is too short!" });
    if (CheckboxSecure && RetypeInput.trim() != PasswordInput.trim()) return setErrorOutput({ show: true, text: "Your passwords don't match!" });
    return true;
  }

  useEffect(() => { 
    checkInputs();
  }, [NameInput, CheckboxSecure, PasswordInput, RetypeInput]);

  return (
    <>
      <Head>
        <title>Create new instance</title>
      </Head>
      <div className='text-gray-light w-full h-full flex flex-col justify-center items-center'>
        <div className='p-14 pc:w-2/6 laptop:3/6 sp:w-full bg-black/80 rounded-3xl flex flex-col justify-center items-center'>
          <h1 className='font-semibold text-xl pc:text-3xl mb-3'>Create a new Feedback Instance</h1>
          <span className='mb-3 w-4/5'>Name:</span>
          <input className='mb-3 w-4/5 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border p-1' type={"text"} onChange={(e) => { setNameInput(e.target.value) }} />
          <span className='mb-3 w-4/5'>
            <input className='mr-2' type="checkbox" name="anonymous" onChange={(e) => { setCheckboxAnonymous(e.target.checked) }} />
            <span>Provide Author Input on Feedbacks</span>
            <span className='ml-1'>?</span>
          </span>
          <span className='mb-3 w-4/5'>
            <input className='mr-2' type="checkbox" name="secure" onChange={(e) => { setCheckboxSecure(e.target.checked) }} />
            <span>Require a password for Feedbacks</span>
            <span className='ml-1'>?</span>
          </span>
          {CheckboxSecure && 
          <div className='w-full flex flex-col justify-center items-center mb-3'>
            <span className='mb-3 w-4/5'>Password:</span>
              <input className='mb-3 w-4/5 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border p-1' type="password" onChange={(e) => { setPasswordInput(e.target.value) }} />
              <span className='mb-3 w-4/5'>Re-Type password:</span>
              <input className='mb-3 w-4/5 text-gray-light bg-dark-bg rounded-lg border-solid border-gray-light border p-1' type="password" onChange={(e) => { setRetypeInput(e.target.value) }} />
            </div>}
          {ErrorOutput.show &&
            <span className='mb-3 w-4/5 text-gray-light bg-red-700/60 rounded-lg p-1 border border-solid border-red-500'>{ErrorOutput.text}</span>}
          <button className='w-20 text-gray-light border rounded-lg hover:bg-c-green-700 p-1' onClick={createNewInstance}>Create</button>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Home;
