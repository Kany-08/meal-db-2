export type MealIngredient = {
  name: string;
  measure: string;
};

export type Meal = {
  id: string;
  alternate: string;
  categoryName: string;
  region: string;
  instructions: string;
  image: string;
  tags: string[];
  youtubeUrl: string;

  ingredients: MealIngredient[];
  sourceUrl?: string;
  imageSource?: string;
};
