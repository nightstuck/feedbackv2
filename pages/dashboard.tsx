import { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import Layout from '../components/l_home'
import Dots from "../public/dots.svg";
import Add from "../public/add.svg";
import Download from "../public/download.svg";
import Delete from "../public/delete.svg";
import Copy from "../public/copy.svg";
import NextLink from 'next/link'
import Image from "next/image";
import InstanceDisplay from '@/components/instancedisplay'
import useSWR from 'swr';
import fetch from '../lib/api'
import Placeholder from '@/components/placeholder'
import OpenInNew from '../public/open_in_new.svg';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Button, Listbox, ListboxItem, Select, SelectItem, Link, ButtonGroup, Card, CardHeader, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from '@nextui-org/react'
import {Selection} from "@react-types/shared";

type inst = {
  id: number;
  name: string;
  secure: boolean;
  anonymous: boolean;
  access_key: string;
}

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<{ instances: inst[], ok: boolean }>("/api/get/instances", fetch);
  const [SelectedInstance, setSelectedInstance] = useState<inst>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([0]));

  useEffect(() => { 
    if (data?.instances == null && !isLoading) router.push("/new");
    else if (SelectedInstance != undefined) setSelectedInstance(data?.instances[0]);
  }, [isLoading]);

  useEffect(() => {
    setSelectedInstance(data?.instances.find((i) => i.id == Number(Array.from(selectedKeys)[0])));
  }, [selectedKeys]);

  if (isLoading) return (
    <Placeholder></Placeholder>
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className='flex flex-col sp:flex-row h-screen gap-3 p-5'>
        <Card className='hidden sp:block min-w-[350px] bg-background/90' >
          <CardHeader className='flex justify-between'>
            <h1 className='font-semibold text-2xl'>{data?.instances.length} Active Instances</h1>
            <Button variant='ghost' color='primary' isIconOnly as={NextLink} href='/new' startContent={<Image src={Add} alt='+'></Image>}></Button>
          </CardHeader>
          <Divider />
          <CardBody>
          <Listbox color='primary' variant='shadow' disallowEmptySelection selectionMode='single' selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
            {data?.instances.map((instance) => (
              <ListboxItem className='' key={instance.id}>{instance.name}</ListboxItem>
            ))}
            </Listbox>
          </CardBody>
        </Card>
        <section>
          <Select className='flex sp:hidden' selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} items={data?.instances} label={`Select Instance (${data?.instances.length})`}>
            {(inst) => <SelectItem key={inst.id}>{inst.name}</SelectItem>}
          </Select>
        </section>
        {SelectedInstance &&
          <Card className='w-full bg-background/90'>
            <CardHeader className='flex justify-between'>
              <h1 className="font-semibold">{SelectedInstance?.name}</h1>
              <ButtonGroup className='hidden sp:block'>
                <Button variant='ghost' color='danger' endContent={<Image src={Delete} alt=''></Image>}>Delete all</Button>
                <Button variant='ghost' color='secondary' endContent={<Image src={Download} alt=''></Image>}>Download</Button>
                <Button variant='ghost' color="secondary" id='button-copyhtml' className='' onClick={() => { navigator.clipboard.writeText("") }} endContent={<Image src={Copy} alt=''></Image>}>Copy HTML Code</Button>
                <Button variant='ghost' color='primary' as={NextLink} id="link-overview" className="" target={"_blank"} href={`/${SelectedInstance?.id}/overview?key=${SelectedInstance?.access_key}`} endContent={<Image className="inline scale-75" src={OpenInNew} alt=""></Image>}>Feedback Viewer</Button>
                <Button variant='ghost' color='primary' as={NextLink} id="link-embedded" className="" target={"_blank"} href={`/${SelectedInstance?.id}/embedded`} endContent={<Image className="inline scale-75" src={OpenInNew} alt=""></Image>}>Feedback Form</Button>
              </ButtonGroup>
              <Dropdown>
                <DropdownTrigger className='sp:hidden'>
                  <Button className='bg-transparent' isIconOnly startContent={<Image src={Dots} alt=''></Image>}></Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key={"copy"}>Copy HTML</DropdownItem>
                  <DropdownItem key={"viewer"}>Open Message Viewer</DropdownItem>
                  <DropdownItem color='primary' className='text-primary' key={"form"}>Open Message Form</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <Divider />
            <CardBody>
              <InstanceDisplay instance={SelectedInstance} access_key={SelectedInstance.access_key} admin={true}></InstanceDisplay>
            </CardBody>
          </Card>}
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
