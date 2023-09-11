import { api } from '@/lib/api';
import { instance } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/l_home'
import type { NextPageWithLayout } from './_app'
import Head from 'next/head';
import { Button, Card, CardBody, CardHeader, Input, Switch } from '@nextui-org/react';

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
    console.log(CheckboxAnonymous);
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
      <main className='flex justify-center'>
        <Card className='p-5 bg-background/90'>
          <CardHeader>
            <h1 className='font-semibold text-xl pc:text-3xl mb-3'>Create a new Feedback Instance</h1>
          </CardHeader>
          <CardBody className='flex flex-col gap-3 items-center'>
            <Input label="Choose an Instance name" className='' type={"text"} onChange={(e) => { setNameInput(e.target.value) }} />
            <span>Disable Name Input on Feedbacks <Switch size='sm' isSelected={CheckboxAnonymous} onValueChange={setCheckboxAnonymous}></Switch></span>
            <span>Require a password for Feedbacks <Switch size='sm' isSelected={CheckboxSecure} onValueChange={setCheckboxSecure}></Switch></span>
            {CheckboxSecure && 
            <div className='w-full flex flex-col items-center gap-3'>
              <Input label="Choose a Password" className='' type="password" onChange={(e) => { setPasswordInput(e.target.value) }} />
              <Input label="Re-Type Password" className='' type="password" onChange={(e) => { setRetypeInput(e.target.value) }} />
            </div>}
            {ErrorOutput.show &&
            <span className='w-full text-gray-light text-center bg-red-700/60 rounded-lg p-1 border border-solid border-red-500'>{ErrorOutput.text}</span>}
            <Button color='primary' variant='ghost' onClick={createNewInstance}>Create</Button>
          </CardBody>
        </Card>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Home;
