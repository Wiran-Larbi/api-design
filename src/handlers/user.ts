import prisma from "../db";

import { NextFunction, Request, Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { ERRORS } from "./errors";




export const createNewUser = async (req: Request,res: Response,next: NextFunction) => {
        try {
            const user = await prisma.user.create({
                data: {
                    username: req.body.username,
                    password: await hashPassword(req.body.password)
                }
            });
    
            const token = createJWT(user);
            res.status(201);
            res.json({ token });

        } catch (error) {
            error.type = ERRORS.INPUT;
            next(error);
        }
        
}

export const signin = async (req: Request,res: Response,next: NextFunction) => {
    
         try {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.body.username
                }
            });
      
            const isValid = await comparePasswords(req.body.password,user.password);
    
            if (!isValid) {
                res.status(401);
                res.json({message: 'nope'});
                return;
            }
    
            const token = createJWT(user);
            res.json({token});
            res.status(200);

         } catch (error) {
            error.type = ERRORS.INPUT;
            next(error);
         }
}


