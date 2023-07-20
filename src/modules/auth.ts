import { User } from '@prisma/client';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const JWT_SECRET = process.env["JWT_SECRET"]!;

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
        return bcrypt.compare(password,hashedPassword);
}
export const hashPassword = (password: string): Promise<string> => {
        return bcrypt.hash(password,5);
}

export const createJWT = (user: User) => {
        const token = jwt.sign({
            id: user.id,
            username: user.username
        },JWT_SECRET);

        return token;
}

export const protect = (req:Request,res:Response, next:NextFunction) => {
        const bearer = req.headers.authorization;
        
        if (!bearer) {
            res.status(401);
            res.json({message: "Not Authorized ❌"});
            return;
        }

        const [,token] = bearer.split(" ");

        if (!token) {
            res.status(401);
            res.json({message: "Invalid Token ❌"});
            return;
        }

        try {
            const user = jwt.verify(token,JWT_SECRET);
            console.log(user);
            (req as any).user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            res.json({message: "Invalid Token ❌"});
            return;
        }


}