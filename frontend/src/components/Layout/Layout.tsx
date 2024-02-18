import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
    children: ReactNode;
    title: string;
}

export default function Layout({ children, title }: LayoutProps) {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="sport" />
                <meta name="viewport" content="width=device-width, initial-scale-1"/>
                <link rel="icon" href="favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </Head>
            <Header />
            <main className="py-0 px-4">{children}</main>
        </>
    )
}