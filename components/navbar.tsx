import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Forum from "../public/forum_light.svg";
import Menu from "../public/menu.svg"
import Close from "../public/close.svg"

const Navbar = () => {
    const router = useRouter();

    const [User, setUser] = useState<{ username: string, email: string }>();
    const [LoggedIn, setLoggedIn] = useState<boolean>(false);
    const [Location, setLocation] = useState<string>();
    const [Collapsed, setCollapsed] = useState<boolean>();
    const [ShowMenu, setShowMenu] = useState<boolean>(false);

    const toggleMenu = () => {
        setShowMenu(!ShowMenu);
    }

    useEffect(() => { 
        setCollapsed(window.screen.width < 700)
        const fetchData = async () => {
            const data = await api<{ ok: boolean, user: { username: string, email: string } }>("get/user");

            setUser(data.user);
            setLoggedIn(data.ok);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setLocation(router.asPath.split('?')[0]);
    }, [router.asPath]);

    if (ShowMenu == true) return (
        <div className="bg-black/80 p-5 relative">
            <Image className="fixed top-1 right-1" src={Close} alt="X" onClick={toggleMenu}></Image>
            <div className="flex flex-col justify-center items-center">
                <Link className={Location == "/" ? "text-green text-sm font-semibold p-3" : "hover:text-green text-gray-light text-sm p-3"} href={"/"}>Homepage</Link>
                <Link className={Location == "/dashboard" ? "text-green text-sm font-semibold p-3" : "hover:text-green text-gray-light text-sm p-3"} href={"/dashboard"}>Dashboard</Link>
                <Link className={Location == "/new" ? "text-green text-sm font-semibold p-3" : "hover:text-green text-gray-light text-sm p-3"} href={"/new"}>New instance</Link>
                <Link className={Location == "/docs" ? "text-green text-sm font-semibold p-3" : "hover:text-green text-gray-light text-sm p-3"} href={"/docs"}>Documentation</Link>
            </div>
        </div>
    );

    if (Collapsed == true) return (
        <div>
            <div className="fixed h-full flex flex-row justify-between items-center pl-2 pr-2">
                <Link href={"/"} className="h-4/6 flex flex-row items-center text-gray-light pr-3">
                    <Image className="m-2 max-h-8 w-auto" src={Forum} alt=""></Image>
                    <h1 className="ml-2 text-lg text-gray-light font-bold">Feedback</h1>
                </Link>
                <Image className="hover:cursor-pointer" src={Menu} alt="-" onClick={toggleMenu}></Image>
            </div>
        </div>
    );

    return (
        <>
            <div className="w-full fixed z-10">
                <div className="h-12 bg-black/80 flex flex-row items-center justify-between border-solid border-t-2 border-c-green-700 pl-2 pr-2">
                    <div className="h-full flex flex-row justify-center items-center">
                        <Link href={"/"} className="h-4/6 flex flex-row items-center text-gray-light pr-3 border-solid border-r border-gray-light">
                            <Image className="m-2 max-h-8 w-auto" src={Forum} alt=""></Image>
                            <h1 className="ml-2 text-lg text-gray-light font-bold">Feedback</h1>
                        </Link>
                        <Link className={Location == "/dashboard" ? "text-green text-sm font-semibold ml-4" : "hover:text-green text-gray-light text-sm ml-4"} href={"/dashboard"}>Dashboard</Link>
                        <Link className={Location == "/new" ? "text-green text-sm font-semibold ml-4" : "hover:text-green text-gray-light text-sm ml-4"} href={"/new"}>New instance</Link>
                        <Link className={Location == "/docs" ? "text-green text-sm font-semibold ml-4" : "hover:text-green text-gray-light text-sm ml-4"} href={"/docs"}>Documentation</Link>
                    </div>
                    <div className="mr-3 h-full text-gray-light text-sm flex flex-row justify-center items-center">
                        {LoggedIn ?
                            <>
                                <span className="h-4/6 border-solid border-r border-gray-light flex flex-row items-center pr-3">Hello<span className="text-green font-semibold ml-1">{User?.username}</span></span>
                                <Link className="hover:text-green h-4/6 flex flex-row items-center pl-3" href={"/api/logout"}>Logout</Link>
                            </>
                            :
                            <>
                                <Link className="hover:text-green" href={"/login"}>Sign In</Link>
                                <Link className="hover:text-green ml-4" href={"/signup"}>Sign Up</Link>
                            </>}
                    </div>   
                </div>
            </div>
        </>
    );
}

export default Navbar;