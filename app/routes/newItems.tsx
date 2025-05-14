import { Form, redirect, type ActionFunctionArgs } from "react-router"
import { supabase } from "~/supabase";

export function meta() {
  return [
    {
      title: "NewItems | SSR"
    },
    {
      name: "Description",
      content: "create new items using supabase CRUD App"
    }
  ]
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if(!title || !description) return {error: "title and descripton are empty"}

  const { error } = await supabase.from("item").insert({title, description});

  if(error) return {error : error.message };

  return redirect("/")
}

const NewItems = () => {
  return (
    <>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
        <Form method="post" className="space-y-4 bg-white p-4 rounded shadow border dark:bg-gray-950">
          <div>
            <label className="block text-gray-700 dark:text-white">Title</label>
            <input
              name="title"
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white">Content</label>
            <textarea
              name="description"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            Create Item
          </button>
        </Form>
    </div>
    </>
  )
}

export default NewItems