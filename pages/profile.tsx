import { ReactElement } from 'react';
import Layout from '../components/l_home';
import Head from 'next/head';
import type { NextPageWithLayout } from './_app';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import Help from '@/components/help';

const Profile: NextPageWithLayout = () => {

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

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Profile;