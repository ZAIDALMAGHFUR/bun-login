import { users, tokenStore } from "../models/UserModel";
import { BaseController } from "./BaseController";
import { generateSecureToken, validateToken } from "../utils/TokenUtils";

export class AuthController {
    static async login(req: Request) {
        const body = await req.json();
        const { username, password } = body;

        const user = users.find((u) => u.username === username && u.password === password);
        if (!user) return BaseController.errorResponse("Invalid credentials", 401);

        const token = generateSecureToken();
        tokenStore[token] = user.id;

        return BaseController.successResponse({ token }, "Login successful", 201);
    }

    static logout(req: Request) {
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.split(" ")[1] ?? null; // Pastikan token bertipe string | null
        if (token && tokenStore[token]) delete tokenStore[token];

        return BaseController.successResponse(null, "Logout successful");
    }

    static profile(req: Request) {
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.split(" ")[1] ?? null; // Pastikan token bertipe string | null
        const validationResult = validateToken(token);

        if (!validationResult.isValid) {
            return BaseController.errorResponse("Invalid or missing token", 401);
        }

        const user = users.find((u) => u.id === validationResult.userId);
        if (!user) return BaseController.errorResponse("User not found", 404);

        return BaseController.successResponse({ user }, "Profile fetched successfully");
    }
}
