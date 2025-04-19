import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>
);
