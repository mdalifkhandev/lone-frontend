export const getCreditScore = (income: number) => {
    const maxIncome = 100000;
    if (typeof income !== "number" || isNaN(income)) {
        return { creditScore: 0, creditTag: "Unknown" };  
    }
    const percent = Math.round(Math.min((income / maxIncome) * 100, 100))
    let tag = "Poor"
    if (percent > 80) {
        tag = "Excellent"
    } else if (percent > 60) {
        tag = "Good"
    } else if (percent > 40) {
        tag = "Fair"
    } else if (percent > 20) { tag = "Low" }
    return { creditScore: percent, creditTag: tag }
}