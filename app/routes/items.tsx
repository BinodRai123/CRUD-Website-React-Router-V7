import { supabase } from "~/supabase";
import type { Route } from "./+types/items";
import { Link } from "react-router";

export function meta() {
  return [
    {title: "Item List"},
    {
      name: "list of items",
      constent: "todo list card made from crud "
    }
  ]
}

export async function loader() {
  const { data, error } = await supabase.from("item").select("*");

  if (error) return { error: error.message };
  return { items: data };
}

export default function Items({ loaderData }: Route.ComponentProps) {
  let { error, items } = loaderData;

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold">Items</h2>
      {error && <div> {error}</div>}

      <ul>
        {items?.map((item) => (
          <TodoItem title={item.title} description={item.description} id={item.id} />
        ))}
      </ul>
    </div>
  );
}

const TodoItem = ({
  title,
  description,
  id
}: {
  title: string;
  description: string;
  id: number
}) => {
  return (
    <li key={id}>
      <Link to={`item/${id}`}>
        <div className="item-card select-none">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </Link>
    </li>
  );
};
