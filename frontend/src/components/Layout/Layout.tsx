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
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet"></link>
            </Head>
            <Header />
            <main className="py-0 px-4">{children}</main>
        </>
    )
}