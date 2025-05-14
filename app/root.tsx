import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { isatty } from "tty";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <nav className="container not-dark:bg-white shadow dark:shadow-gray-800">
        <div className="wraper-container">
          <NavLink
            className="text-xl sm:text-2xl font-bold text-shadow-lg/20"
            to="/"
          >
            CRUD Router-V7
          </NavLink>
          <div className="space-x-2.5 text-gray-500 font-medium sm:space-x-5 sm:font-normal sm:text-[1.25rem]">
            <NavLink
              className={({isActive}) => isActive ? "dark:text-white not-dark:text-black border-b" : "text-gray-500"}
              to="/"
            >
          
              Items
            </NavLink>
            <NavLink
              className={({isActive}) => isActive ? "dark:text-white not-dark:text-black border-b" : "text-gray-500"}
              to="/newItem"
            >
          
              New Item
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container h-screen">
        <div className="wraper-container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
