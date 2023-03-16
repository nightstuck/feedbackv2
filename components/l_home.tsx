import React, { PropsWithChildren } from "react";
import Footer from "./footer";
import Navbar from "./navbar";


const L_Home = ({ children }: PropsWithChildren) => {
	return (
		<div className="w-full h-screen">
			<Navbar></Navbar>
			{children}
			<Footer></Footer>
		</div>
	);
};

export default L_Home;
