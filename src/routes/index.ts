import { AuthController } from "../controllers/AuthController";
import { TokenMiddleware } from "../middlewares/TokenMiddleware";
import { BaseController } from "../controllers/BaseController"; // Import BaseController

export const routes = (req: Request) => {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/login") {
        return AuthController.login(req);
    }

    if (req.method === "POST" && url.pathname === "/logout") {
        const auth = TokenMiddleware(req);
        if (!auth.isValid) return auth.response!;
        return AuthController.logout(req);
    }

    if (req.method === "GET" && url.pathname === "/profile") {
        const auth = TokenMiddleware(req);
        if (!auth.isValid) return auth.response!;
        return AuthController.profile(req);
    }

    return BaseController.errorResponse("Endpoint not found", 404);
};
