import Image from "next/image";
import Link from "next/link";
import Forum from "../public/forum_light.svg"

const Footer = () => {
    return (
        <>
            <div className="h-20 flex flex-row justify-center items-center relative">
                <div className="h-full w-3/4 flex flex-row gap-4 justify-center items-center border-solid border-gray-light border-t">
                    <Link href={"/"}>
                        <Image src={Forum} alt="" className="max-h-7 w-auto"></Image>
                    </Link>
                    <h1 className="text-white ml-3 text-xs">2023 Nightstuck's Feedback</h1>
                    <Link className="text-white ml-3 text-xs hover:text-green" href={"/terms"}>Terms</Link>
                    <Link className="text-white ml-3 text-xs hover:text-green" href={"/privacy"}>Privacy</Link>
                    <Link className="text-white ml-3 text-xs hover:text-green" href={"/security"}>Security</Link>
                </div>
            </div>
        </>
    );
}

export default Footer;