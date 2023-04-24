import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import Layout from '../../components/l_overview';
import { ReactElement } from "react";
import InstanceDisplay from "@/components/instancedisplay";
import useSWR from 'swr';
import fetch from '../../lib/api'
import Head from "next/head";

type inst = {
  instance: {
		id: number;
		name: string;
		secure: boolean;
		anonymous: boolean;
	};
}

const Overview: NextPageWithLayout = () => {
    const router = useRouter();
    const { instance_id } = router.query;

    const { data, error, isLoading } = useSWR<{ok: boolean, instance: {id: number, name: string, secure: boolean, anonymous: boolean}}>(`/api/get/instance?id=${instance_id}`, fetch, { refreshInterval: 2000 });

    if (isLoading) return (<></>);

  return (
    <>
      <Head>
        <title>{ data.instance.name } Viewer</title>
      </Head>
      <div className="flex flex-col items-center">
          <div className="w-5/6">
              <InstanceDisplay instance={data.instance}></InstanceDisplay>
          </div>
      </div>
    </>
    );
}

Overview.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Overview;
