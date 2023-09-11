import Image from "next/image";
import NextLink from "next/link";
import Forum from "../public/forum_light.svg";
import { Link } from "@nextui-org/react";

const Footer = () => {
    return (
        <>
            <div className="h-20 flex flex-row justify-center items-center relative">
                <div className="h-full w-3/4 flex flex-col sp:flex-row gap-4 sp:justify-center items-center border-solid border-gray-light border-t pt-5 sp:pt-0 text-xs">
                    <Link as={NextLink} href={"/"}>
                        <Image src={Forum} alt="" className="max-h-7 w-auto"></Image>
                    </Link>
                    <h1 className="text-center">2023 Nightstuck's Feedback</h1>
                    <Link className="text-xs" color="foreground" href={"/terms"} as={NextLink}>Terms</Link>
                    <Link className="text-xs" color="foreground" href={"/privacy"} as={NextLink}>Privacy</Link>
                    <Link className="text-xs" color="foreground" href={"/security"} as={NextLink}>Security</Link>
                </div>
            </div>
        </>
    );
}

export default Footer;