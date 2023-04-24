import Placeholder from '@/components/placeholder';
import type { ReactElement } from 'react'
import Layout from '../components/l_home'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {

  return (<h1 className='text-gray-light'>shhh</h1>);
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Home;
