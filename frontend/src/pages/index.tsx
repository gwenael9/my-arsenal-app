import Layout from "@/components/Layout/Layout";

export default function Home() {
    return (
        <Layout title="Accueil">

            <div className="flex">

                <div className="bg-yellow-500 md:w-1/2 h-screen-minus-header">

                    <div className="flex flex-col justify-center p-4 gap-4">
                        <h1 className="md:text-6xl text-4xl">Bienvenue sur Arsenal-app !</h1>
                        <div>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam repellendus veritatis labore placeat ut ullam cupiditate? Deserunt vitae cupiditate suscipit laudantium laboriosam aperiam omnis, magni adipisci quas libero similique itaque.
                            </p>
                        </div>
                    </div>

                    <div className="border-t">
                        
                    </div>

                </div>

                <div className="">
                    <div className="bg-green-500">test</div>
                    <div className="bg-purple-500">test</div>
                </div>

            </div>

        </Layout>
    )
}