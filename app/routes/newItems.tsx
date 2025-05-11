import { Form, redirect, type ActionFunctionArgs } from "react-router"
import { supabase } from "~/supabase";

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
      <Form method="POST">
        <div>
          <label>Title</label>
          <input type="text" name="title" required />
        </div>

        <div>
          <label>Description</label>
          <textarea name="description" required />
        </div>

        <button type="submit">
          Create Item
        </button>
      </Form>
    </>
  )
}

export default NewItems