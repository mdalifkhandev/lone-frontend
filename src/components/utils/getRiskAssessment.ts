

/**
 * @param {number} debitToIncomeRatio 
 * @returns {"Low" | "Medium" | "High"} 
 */
export const getRiskAssessment = (debitToIncomeRatio: number): "Low" | "Medium" | "High" => {
    if (debitToIncomeRatio >= 0 && debitToIncomeRatio <= 36) {
        return "Low";
    } else if (debitToIncomeRatio >= 37 && debitToIncomeRatio <= 49) {
        return "Medium";
    } else {
        return "High";
    }
};