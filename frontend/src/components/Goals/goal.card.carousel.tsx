import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import GoalCard from "./goal.card";
import { useGoalsQuery } from "@/types/graphql";

export function GoalsCarousel() {

    const [api, setApi] = useState<CarouselApi | null>(null);
    const [loading, setLoading] = useState(true); 

    const { data } = useGoalsQuery();

    useEffect(() => {
        if (data && data.goals) {
            setLoading(false);
        }
    }, [data]);
    
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Carousel setApi={setApi} className="w-full max-w-xs">
                    <CarouselPrevious />
                    <CarouselContent>
                        {data?.goals.map((goal) => ( 
                            <CarouselItem key={goal.id}>
                                <GoalCard goal={goal} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext />
                </Carousel>
            )}
        </div>
    );
}
