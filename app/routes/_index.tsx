import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix Recipes" },
    { name: "description", content: "Welcome to Remix Recipes!" },
  ];
};

export default function Index() {
  return (
    <div className="container py-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Remix Recipes
      </h1>
      <div className="flex w-full mx-auto mt-14 items-center space-x-2 justify-center">
        <Input
          className="md:w-2/5"
          type="text"
          placeholder="Type a recipe name"
        />
        <Button className="min-w-fit" type="submit">
          Find my recipe
        </Button>
      </div>
    </div>
  );
}
