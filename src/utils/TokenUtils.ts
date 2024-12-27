import crypto from "crypto";
import { tokenStore } from "../models/UserModel";

export const generateSecureToken = (): string => {
    return `${crypto.randomBytes(16).toString("hex")}.${crypto.randomUUID()}`;
};

export const validateToken = (token: string | null) => {
    if (!token) return { isValid: false };

    const userId = tokenStore[token];
    if (!userId) return { isValid: false };

    return { isValid: true, userId };
};
