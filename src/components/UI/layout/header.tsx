"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";
import RegistrationModal from "@/components/UI/modals/registration.modal";
import LoginModal from "@/components/UI/modals/login.modal";
import {useState} from "react";
import {signOutFunc} from "@/actions/sign-out";
import {useAuthStore} from "@/store/auth.store";

export const Logo = () => {
    return (
        <Image src="/img.png"
               alt={siteConfig.title}
               width={70}
               height={40}
               priority
        />
    );
};

export default function Header() {
    const {isAuth, session, status, setAuthState} = useAuthStore()
    const pathname = usePathname();

    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [isLoginOpen, setIsLoginOPen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOutFunc();
        } catch (e) {
            console.error('error', e);
        }

        setAuthState('unauthenticated', null)
    }
    /* const handleSignIn = async () => {
         await signInWithCredentials();
     }*/

    const getNavItems = () => {
        return siteConfig.navItems
            .filter((item) => {
                if (item.href === "/ingredients") {
                    return isAuth
                }
                return true
            })
            .map((item) => {
            const isActive = pathname == item.href;
            return (
                <NavbarItem key={item.href}>
                    <Link
                        className={`px-3 py-1 
                        ${isActive ? "text-blue-500" : "text-foreground"} 
                        hover:text-blue-300 
                        hover:border 
                        hover:border-blue-300 
                        hover:rounded-md 
                        transition-colors 
                        transition-border 
                        duration-200`}
                        color="foreground"
                        href={item.href}>
                        {item.label}
                    </Link>
                </NavbarItem>
            )
        })
    }

    return (
        <Navbar style={{height: layoutConfig.headerHeight}}>
            <NavbarBrand>
                <Link href="/public" className="flex gap-3 items-center">
                    <Logo/>
                    <p className="font-bold text-inherit">{siteConfig.title}</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {getNavItems()}
            </NavbarContent>
            <NavbarContent justify="end">
                {isAuth && <p>Hello, {session?.user?.email}</p>}
                {status === 'loading' ? <p>Loading...</p> : !isAuth ?
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button
                                href="#"
                                color="secondary"
                                as={Link}
                                variant="flat"
                                onPress={() => setIsLoginOPen(true)}
                            >
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link}
                                    color="primary"
                                    href="#"
                                    variant="flat"
                                    onPress={() => setIsRegistrationModalOpen(true)}
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </> :
                    <NavbarItem className="hidden lg:flex">
                        <Button
                            href="#"
                            color="secondary"
                            as={Link}
                            variant="flat"
                            onPress={handleSignOut}
                        >
                            Logout
                        </Button>
                    </NavbarItem>
                }
            </NavbarContent>
            <RegistrationModal isOpen={isRegistrationModalOpen}
                               onClose={() => setIsRegistrationModalOpen(false)}/>
            <LoginModal isOpen={isLoginOpen}
                        onClose={() => setIsLoginOPen(false)}/>
        </Navbar>
    );
}
