import React, { PropsWithChildren } from "react";
import Footer from "./footer";
import Forum from '../public/forum_light.svg'
import Link from 'next/link';
import Image from 'next/image';


const L_Login = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className='w-full h-5/6 flex flex-row justify-center items-center'>
				<div className='pc:w-1/5 sp:w-full tablet:w-full laptop:w-2/5 flex flex-col gap-3 justify-center items-center bg-black/80 rounded-3xl pt-10 pb-5 m-10'>
					<Link href={"/"} className="flex flex-col items-center">
						<Image className="scale-150" src={Forum} alt=""></Image>
						<h1 className="text-gray-light text-3xl font-bold pt-6">Nightstuck's Feedback</h1>
					</Link>
					{children}
				</div>
			</div>
			<Footer></Footer>
		</>
	);
};

export default L_Login;