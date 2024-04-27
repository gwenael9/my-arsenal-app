import Layout from "@/components/Layout/Layout";
import { useGoalsQuery } from "@/types/graphql";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRouter } from "next/router";

const GoalCarouselPage = () => {
    const router = useRouter();
    const { data } = useGoalsQuery();
    const goals = data?.goals || [];
    const goalId = router.query.id as string;

    // Trouver l'index du but avec l'ID correspondant
    const initialGoalIndex = goals.findIndex(goal => goal.id === goalId);

    // Filtrer les buts pour placer le but sélectionné en premier
    const filteredGoals = initialGoalIndex !== -1 ? [goals[initialGoalIndex], ...goals.slice(0, initialGoalIndex), ...goals.slice(initialGoalIndex + 1)] : goals;

    return (
        <Layout title="Carrousel des buts">
            <Carousel>
                <CarouselContent>
                    {filteredGoals.map((goal) => (
                        <CarouselItem key={goal.id}>
                            <iframe src={goal.link} frameBorder="0" width="100%" height="400"></iframe>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </Layout>
    );
};

export default GoalCarouselPage;
