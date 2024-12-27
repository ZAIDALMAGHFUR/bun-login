import { validateToken } from "../utils/TokenUtils";
import { BaseController } from "../controllers/BaseController";

export const TokenMiddleware = (req: Request): { isValid: boolean; response?: Response } => {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { isValid: false, response: BaseController.errorResponse("Unauthorized", 401) };
    }

    const token = authHeader.split(" ")[1];
    const result = validateToken(token);
    if (!result.isValid) {
        return { isValid: false, response: BaseController.errorResponse("Invalid token", 401) };
    }

    return { isValid: true };
};
