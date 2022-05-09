import { useCallback, useState } from "react";


const useRating = () => {
    const [review, setReview] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [missionRating, setMissionRating] = useState(0);

    const handleReview = useCallback((e) => {
        setReview(e.target.value);
    }, []);

    const handleDifficulty = useCallback((e) => {
        setDifficulty(e.target.value)
    }, []);

    const handleMissionRating = useCallback((e) => {
        setMissionRating(e.target.value);
    }, []);

    return [review, difficulty, missionRating, handleReview, handleDifficulty, handleMissionRating];
}

export {useRating};