import "dotenv/config";
import { serve } from "bun";
import { routes } from "./routes";

serve({
    port: Number(process.env.PORT) || 3000,
    fetch: routes,
});

console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
