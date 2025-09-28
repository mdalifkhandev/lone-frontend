export const getScore = (amount: number, maxScore: number): number => {
    const score = Math.round((Math.max(0, amount) / 100000) * maxScore);
    

    return score > maxScore ? maxScore : score;
};