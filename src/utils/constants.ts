
export const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
// export const BACKEND_URL: string = "http://localhost:5000/";
export const NUTRIENTS_ORDERED: Array<string> = [
    "calories",
    "fat_total",
    "fat_saturated",
    "carbohydrates",
    "fiber",
    "sugar",
    "protein",
    "sodium",
    "potassium",
    "cholesterol",
];

export const ACTIVITY_LEVELS: Array<string> = [
    "sedentary",
    "light",
    "moderate",
    "high",
    "very_high",
    "extreme",
];

