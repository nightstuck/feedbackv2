import Placeholder from '@/components/placeholder';
import type { ReactElement } from 'react'
import Layout from '../components/l_home'
import type { NextPageWithLayout } from './_app'
import Head from 'next/head';

const Home: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>Feedback</title>
      </Head>
      <h1 className='text-gray-light'>Welcome to Nighstuck's Feedback Service</h1>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Home;
