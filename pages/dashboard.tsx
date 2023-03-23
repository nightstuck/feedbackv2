import { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import Layout from '../components/l_home'
import Link from 'next/link'
import { instance, feedback } from '@prisma/client'
import InstanceDisplay from '@/components/instancedisplay'
import useSWR from 'swr';
import fetch from '../lib/api'
import Placeholder from '@/components/placeholder'

const Home: NextPageWithLayout = () => {
  //const [Instances, setInstances] = useState<instance[]>([]);
  const { data, error, isLoading } = useSWR<{instances: instance[], ok: boolean}>("/api/get/instances", fetch);
  const [SelectedInstance, setSelectedInstance] = useState<instance>();

  if (isLoading) return (
    <Placeholder></Placeholder>
  );

  return (
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
          {SelectedInstance && <InstanceDisplay instance={SelectedInstance}></InstanceDisplay>}
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Home;
