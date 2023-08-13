interface Recipe {
  title: string;
  ingredients: string[];
  directions: string[];
}

export function parseRecipe(recipeText: string): Recipe {
  const lines: string[] = recipeText.trim().split("\n");
  let title: string | null = null;
  const ingredients: string[] = [];
  const directions: string[] = [];

  for (const line of lines) {
    const words: string[] = line.split(" ");

    if (line.includes("title:")) {
      title = words.slice(1).join(" ");
    } else if (line.includes("ingredients:")) {
      const ingredientsText: string = words.slice(1).join(" ");
      ingredients.push(...ingredientsText.split(", "));
    } else if (line.includes("directions:")) {
      const directionsText: string = words.slice(1).join(" ");
      directions.push(...directionsText.split(". "));
    }
  }

  const recipeObject: Recipe = {
    title: title || "",
    ingredients: ingredients,
    directions: directions,
  };

  return recipeObject;
}
