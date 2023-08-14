export function parseRecipe(input: string): {
  title: string;
  ingredients: string;
  directions: string;
} {
  const parts = input.split("ingredients:");

  if (parts.length !== 2) {
    throw new Error(
      'Invalid input format. Please provide a string with "title," "ingredients," and "directions" sections.'
    );
  }

  const [titlePart, rest] = parts;
  const [ingredientsPart, directionsPart] = rest.split("directions:");

  if (!titlePart.trim() || !ingredientsPart.trim() || !directionsPart.trim()) {
    throw new Error(
      "Invalid input format. Please provide non-empty title, ingredients, and directions sections."
    );
  }

  const title = titlePart.trim().split(":")[1].trim();
  const ingredients = ingredientsPart.trim();
  const directions = directionsPart.trim();

  return { title, ingredients, directions };
}
