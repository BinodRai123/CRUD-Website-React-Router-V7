import { supabase } from "~/supabase";
import type { Route } from "./+types/item";
import { Form, redirect, type ActionFunctionArgs } from "react-router";

export function meta({params}: Route.MetaArgs){
  return [
    {title: `Edit item ${params.id} || RRV7`},
    {
      name: "description",
      content: "Edit or Delete the item from the list"
    }
  ]
}

export async function loader({ params }: Route.LoaderArgs) {
  let id = params.id;

  if (!id) return { error: "No Id Given..." };

  const { data, error } = await supabase
    .from("item")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return { error: error.message };
  return { item: data };
}

export async function action({ request , params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const intent = formData.get("intent");

  if(intent === "delete"){
    const { error } = await supabase.from("item").delete().eq("id", params.id);
    if(error) return {error: error.message}
    return redirect("/");

  }else if(intent === "update"){
    const {error} = await supabase.from("item").update({title, description}).eq("id", params.id);
    if(error) return {error: error.message}
    return redirect("/");
  }

  return {};
}

const Item = ({ loaderData }: Route.ComponentProps) => {
  const { item, error } = loaderData;

  return (
    <div className="min-w-full border border-gray-400 shadow-xl p-5">
      {error && <div>{error}</div>}

      <h1>Update</h1>

      <Form method="post" className="dark:text-white">
        <div>
          <label className="block text-gray-700 dark:text-white">Title</label>
          <input
            name="title"
            type="text"
            defaultValue={item.title}
            className="border border-gray-300 rounded px-3 py-2 w-full shadow-inner"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-white">Content</label>
          <textarea
            name="description"
            defaultValue={item.description}
            className="border border-gray-300 rounded px-3 py-2 min-h-fit w-full shadow-inner"
            required
          />
        </div>
        <div className="space-x-5">
          <button
            type="submit"
            value="update"
            name="intent"
            className="form-btn"
          >
            Update Item
          </button>

          <button
            type="submit"
            value="delete"
            name="intent"
            className="form-btn"
          >
            Delete Item
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Item;
