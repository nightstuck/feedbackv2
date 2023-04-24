import { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import Layout from '../components/l_home'
import Link from 'next/link'
import InstanceDisplay from '@/components/instancedisplay'
import useSWR from 'swr';
import fetch from '../lib/api'
import Placeholder from '@/components/placeholder'
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import OpenInNew from '../public/open_in_new.svg';
import { useRouter } from 'next/router'
import Head from 'next/head'

type inst = {
  id: number;
  name: string;
  secure: boolean;
  anonymous: boolean;
}

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<{instances: inst[], ok: boolean}>("/api/get/instances", fetch);
  const [SelectedInstance, setSelectedInstance] = useState<inst>();

  useEffect(() => { 
    if (data?.instances == null && !isLoading) router.push("/new");
    else if(!SelectedInstance) setSelectedInstance(data?.instances[0]);
  }, [isLoading]);

  if (isLoading) return (
    <Placeholder></Placeholder>
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-5/6 h-5/6 grid grid-cols-3 grid-rows-2 auto-cols-max auto-rows-max gap-10 relative'>
          <div className='bg-black/80 text-gray-light rounded-3xl row-span-2 p-8 relative'>
            <Link className="absolute top-right-5 right-5 font-semibold text-2xl hover:text-green hover:border-green border border-gray-light border-solid w-8 rounded-full flex justify-center items-center" href="/new">+</Link>
            <h1 className='font-semibold text-2xl'>{data?.instances.length} Active Instances:</h1>
            <ul className='pt-2'>
              {data?.instances.map((instance) => (
                <li className='w-full' key={instance.id}><a className={SelectedInstance != undefined && SelectedInstance.id == instance.id ? 'p-2 block w-full hover:cursor-pointer bg-c-green-700 rounded-lg' : 'p-2 block w-full hover:cursor-pointer hover:bg-c-green-700 rounded-lg'} onClick={() => {
                  setSelectedInstance(instance);
                }}>{instance.name}</a></li>
              ))}
          </ul>
          </div>
          <div className='bg-black/80 text-gray-light rounded-3xl row-span-2 col-span-2 p-3 overflow-y-auto scrollbar-track-black scrollbar-thumb-c-green-700'>
            <div className="flex flex-row justify-between p-2 border-b border-gray-light">
              <div className="flex flex-row gap-3">
                  <h1 className="font-semibold">{SelectedInstance?.name}</h1>
              </div>
              <div>
                <button id='button-copyhtml' className='hover:text-green' onClick={() => { navigator.clipboard.writeText("")}}>Copy HTML Code</button>
                <Tooltip anchorSelect="#button-copyhtml" content="HTML Code to embed the Feedback Form in your Website via <iframe>" />
              </div>
              <div className="flex flex-row gap-3">
                  <Link id="link-overview" className="hover:text-green flex flex-row items-center" target={"_blank"} href={`/${SelectedInstance?.id}/overview`}>Feedback Viewer<Image className="inline scale-75" src={OpenInNew} alt=""></Image></Link>
                  <Tooltip anchorSelect="#link-overview" content="Open the Feedback Viewer" />    
                  <Link id="link-embedded" className="hover:text-green flex flex-row items-center" target={"_blank"} href={`/${SelectedInstance?.id}/embedded`}>Feedback Form<Image className="inline scale-75" src={OpenInNew} alt=""></Image></Link>
                  <Tooltip anchorSelect="#link-embedded" content="Open the Feedback Form" />  
              </div>
            </div>
            {SelectedInstance && <InstanceDisplay instance={SelectedInstance}></InstanceDisplay>}
          </div>
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
