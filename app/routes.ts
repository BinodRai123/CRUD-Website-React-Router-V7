import { type RouteConfig, index , route, layout } from "@react-router/dev/routes";

export default [
    index("routes/items.tsx"), 
    route("newItem","routes/newItems.tsx")
] satisfies RouteConfig;
