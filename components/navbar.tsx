import { api } from "@/lib/api";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  Navbar as NavMain,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Link, Button, Divider, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import Forum from "../public/forum_light.svg";
import Menu from "../public/menu.svg";
import Info from "../public/info.svg";
import Close from "../public/close.svg";
import Help from "./help";


const Navbar = () => {
    const router = useRouter();

    const [User, setUser] = useState<{ username: string, email: string }>();
    const [LoggedIn, setLoggedIn] = useState<boolean>(false);
    const [Location, setLocation] = useState<string>();
    const [ShowMenu, setShowMenu] = useState<boolean>(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => { 
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

    return (
        <NavMain isBordered onMenuOpenChange={setShowMenu} maxWidth="full">
            <NavbarContent>
                <NavbarMenuToggle className="tablet:hidden" icon={<Image src={Menu} alt=""></Image>} />
                <NavbarBrand>
                    <NextLink className="flex items-center gap-2" href={"/"}>
                        <Image src={Forum} alt=""></Image>
                        <p className="font-bold">Messages</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden tablet:flex" justify="center">
                <NavbarItem>
                    <Link className="" href={"/"} as={NextLink}>Homepage</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="" href={"/dashboard"} as={NextLink}>Dashboard</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="" href={"/docs"} as={NextLink}>Docs</Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <Button onPress={onOpen} variant="ghost" isIconOnly startContent={<Image src={Info} alt=""></Image>}></Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" backdrop="blur" placement="center">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">How to use:</ModalHeader>
                                <ModalBody><Help></Help></ModalBody>
                                <ModalFooter><Button onPress={onClose} variant="ghost" color="danger">Close</Button></ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                {LoggedIn ? <>
                    <NavbarItem className="flex items-center gap-2">
                        <span className="">Hello <Link as={NextLink} href="/profile">{User?.username}</Link></span>
                        <Divider orientation="vertical" />
                        <Button className="hidden sp:flex" color="danger" variant="ghost" as={NextLink} href={"/api/logout"}>Logout</Button>      
                    </NavbarItem>
                </> : <>
                    <NavbarItem className="hidden sp:flex">
                        <Button as={NextLink} href={"/signup"}>Sign Up</Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button color="primary" as={NextLink} href={"/login"}>Login</Button>
                    </NavbarItem>
                </>}
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link className="" href={"/"} as={NextLink}>Homepage</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="" href={"/dashboard"} as={NextLink}>Dashboard</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="" href={"/docs"} as={NextLink}>Docs</Link>
                </NavbarMenuItem>
                {!LoggedIn ? <NavbarMenuItem className="sp:hidden">
                        <Link className="" color="success" href={"/signup"} as={NextLink}>Sign Up</Link>
                </NavbarMenuItem> : <NavbarMenuItem className="sp:hidden">
                    <Link color="danger" href={"/api/logout"} as={NextLink}>Logout</Link>
                </NavbarMenuItem>}
            </NavbarMenu>
        </NavMain>
    );
}

export default Navbar;