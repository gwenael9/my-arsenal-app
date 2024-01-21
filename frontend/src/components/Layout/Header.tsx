import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 left-0 right-0 p-4 bg-red-500">

            <div className="flex mx-auto items-center justify-between text-white">

                <nav className="items-center space-x-8 hidden md:inline">
                    <Link href="/players">Equipe</Link>
                    <Link href="/statistique">Stats</Link>
                    <Link href="/goals">Buts</Link>
                </nav>  

                {/* burger */}
                <div className="md:hidden">
                    coucou
                </div>

                {/* search */}
                <form className="bg-white" action=""></form>

                <div className="flex justify-between items-center gap-2.5">
                    <Link href="/" className="">
                        <span className="md:hidden">AFC</span>
                        <span className="hidden md:inline">ARSENAL</span>
                    </Link>
                </div>

            </div>
            
        </header>
    )
}