 export const getCreditLevel = (score: number): "High" | "Medium" | "Low" | "Unknown" => {
        if (score >= 80 && score <= 100) return "High";
        if (score >= 50 && score < 80) return "Medium";
        if (score >= 0 && score < 50) return "Low";
        return "Unknown";
    };