"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import VideoFooter from "@/components/VideoFooter";
import MainNav from "@/components/MainNav";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAboutUs = pathname === "/about";
    const isAdmin = pathname === "/admin";  

    return (
        <Provider store={store}>
        <SmoothScroll>
            {!isAboutUs && !isAdmin && <MainNav isAdmin={isAdmin} />}
            <div className={isAboutUs || isAdmin ? "" : "lg:pl-[200px]"}>
            {/* <div > */}
                <main>{children}</main>
                {!isAboutUs && !isAdmin && <VideoFooter />}
            </div>
        </SmoothScroll>
        </Provider>
    );
}