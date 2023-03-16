import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import Layout from '../../components/l_home'

const Home: NextPageWithLayout = () => {
  return (
    <div className='w-full h-full grid grid-cols-3 grid-rows-2 auto-cols-max auto-rows-max gap-10'>
      <div className='bg-white rounded-3xl'>Hallo</div>
      <div className='bg-white rounded-3xl'>Hallo</div>
      <div className='bg-white rounded-3xl'>Hallo</div>
      <div className='bg-white rounded-3xl'>Hallo</div>
      <div className='bg-white rounded-3xl'>Hallo</div>
      <div className='bg-white rounded-3xl'>Hallo</div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Home;
