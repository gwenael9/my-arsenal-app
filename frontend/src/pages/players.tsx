import Layout from "@/components/Layout/Layout";
import { LIST_PLAYERS } from "@/requetes/queries/player.queries";
import { PlayersQuery, PlayersQueryVariables } from "@/types/graphql";
import { useQuery } from "@apollo/client";

export default function Players() {

    const { data } = useQuery<PlayersQuery, PlayersQueryVariables>(LIST_PLAYERS, {
        fetchPolicy: "no-cache",
    });

    return (
        <Layout title="Equipe">

            <h1>ohhhhhhhhhhhh</h1>
            <div className="flex">
                {data?.players.map((player) => (
                    <div key={player.id}>
                        <h3>{player.name}</h3>
                    </div>
                ))}
            </div>
            
        </Layout>
    )

}