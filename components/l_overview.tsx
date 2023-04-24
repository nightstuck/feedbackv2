import React, { PropsWithChildren } from "react";
import Footer from "./footer";

const L_Home = ({ children }: PropsWithChildren) => {
	return (
		<div className="w-full h-full">
			<div className="pt-12 w-full h-full relative">
			{children}
			</div>
			<Footer></Footer>
		</div>
	);
};

export default L_Home;
