import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { NextFunction, Request, Response } from "express";

export const adminMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (!token) {
        // console.log("called");
        res.status(403).json({ error: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as {
            role: string;
            userId: string;
        };

        if (decoded.role !== "Admin") {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        req.userId = decoded.userId;
        next();
    } catch (e) {
        res.status(403).json({ error: "Unauthorized" });
        return;
    }
};
