import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { badRequest } from "~/utils/request.server";
import { parseRecipe } from "~/utils/parse-recipe";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix Recipes" },
    { name: "description", content: "Welcome to Remix Recipes!" },
  ];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  if (!name) {
    return badRequest({
      formError: "Form not submitted correctly.",
    });
  }

  const response = await fetch(
    "https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_SECRET_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({ inputs: name }),
    }
  );

  const result = await response.json();

  const parsedRecipe = parseRecipe(result[0].generated_text);
  return parsedRecipe;
}

export default function Index() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isGenerating = navigation.state === "submitting";

  return (
    <div className="container py-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Remix Recipes
      </h1>
      <Form method="post">
        <div className="flex w-full mx-auto mt-14 space-x-2 justify-center flex-col md:flex-row">
          <div className="flex-col md:w-2/5 mb-4 md:mb-0">
            <Input
              type="text"
              name="name"
              placeholder="Type a recipe name"
              aria-invalid={Boolean(data?.formError)}
              aria-errormessage={data?.formError ? "name-error" : undefined}
            />
            {data?.formError ? (
              <span
                className="text-red-500 ml-2 text-sm"
                id="name-error"
                role="alert"
              >
                {data.formError}
              </span>
            ) : null}
          </div>

          <Button
            className="w-full md:w-1/6"
            type="submit"
            disabled={isGenerating}
          >
            {isGenerating && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Find my recipe
          </Button>
        </div>
      </Form>
      <div className="text-center mt-20">
        <h2 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl text-center">
          {data?.title}
        </h2>
        <p className="leading-6 my-5">{data?.ingredients}</p>
        <p className="leading-6">{data?.directions}</p>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="container py-6 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Remix Recipes
      </h1>
      <p className="text-center mt-20">
        Something went wrong. Please try again later.
      </p>
      <Button asChild>
        <Link to="/" className="mt-10">
          Try again
        </Link>
      </Button>
    </div>
  );
}
