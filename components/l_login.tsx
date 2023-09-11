import React, { PropsWithChildren } from "react";
import Footer from "./footer";
import Forum from '../public/forum_light.svg'
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";


const L_Login = ({ children }: PropsWithChildren) => {
	return (
		<>
			<main className="flex flex-col items-center p-10 gap-3">
				<Card className="max-w-[600px]">
					<CardHeader className="flex justify-center">
						<Link href={"/"} className="flex flex-col items-center p-3">
							<Image className="scale-150" src={Forum} alt=""></Image>
							<h1 className="text-gray-light text-3xl font-bold pt-6 text-center">Nightstuck's Feedback</h1>
						</Link>
					</CardHeader>
					<CardBody>
						{children}
					</CardBody>
					<CardFooter>
						<Footer></Footer>
					</CardFooter>
				</Card>
			</main>
		</>
	);
};

export default L_Login;