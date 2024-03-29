import Placeholder from '@/components/placeholder';
import type { ReactElement } from 'react'
import Layout from '../components/l_home';
import type { NextPageWithLayout } from './_app';
import Head from 'next/head';
import NextLink from 'next/link';
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Divider, Link } from '@nextui-org/react';
import Help from '@/components/help';

const Home: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>Feedback</title>
      </Head>
      <main className='h-full'>
        <Card>
          <CardHeader>
            <h1>Welcome to Nighstuck's Feedback Service</h1>
          </CardHeader>
          <Divider />
          <CardBody>
          <p>Don't want to use an IRC Chat in your Livestream? Collect Real-Time Feedbacks, anonymous and password-secured, if wanted. It's easy to integrate into your Website and will always be free to use!</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h1>How to use this Tool:</h1>
          </CardHeader>
          <CardBody>
            <Help></Help>
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
