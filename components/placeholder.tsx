import Image from "next/image";
import Link from "next/link";
import Forum from "../public/forum_light.svg"

const Placeholder = () => {
    return (
        <div className="h-screen w-full grid grid-cols-3 gap-10 p-20 animate-pulse">
            <div className="bg-black/80 row-span-2 rounded-3xl"></div>
            <div className="bg-black/80 col-span-2 rounded-3xl"></div>
            <div className="bg-black/80 rounded-3xl"></div>
            <div className="bg-black/80 rounded-3xl"></div>
        </div>
    );
}

export default Placeholder;