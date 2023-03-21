import { useRouter } from "next/router";

const Overview = () => {
    const router = useRouter();
    const { instance_id } = router.query;

    return (<h1 className='text-gray-light'>Feedback Overview for #{instance_id }</h1>);
}

export default Overview;
