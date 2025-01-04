
interface StringToNumber {
    [key: string]: number;
}

export const BACKEND_URL: string = "http://localhost:5000/";
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
// source: https://www.fda.gov/media/99059/download
// source: https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium/potassium
export const NUTRIENTS_RDA: StringToNumber = {
    "calories": 2000,
    "fat_total": 78,
    "fat_saturated": 20,
    "carbohydrates": 275,
    "fiber": 28,
    "sugar": 50,
    "protein": 50,
    "sodium": 2300,
    "potassium": 3000,
    "cholesterol": 300,
};

export const ACTIVITY_LEVELS: Array<string> = [
    "sedentary",
    "light",
    "moderate",
    "high",
    "very_high",
    "extreme",
];

