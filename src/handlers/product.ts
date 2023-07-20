import { NextFunction, Request, Response } from "express";
import prisma from "../db"
import { ERRORS } from "./errors";

export const getProducts = async (req: Request,res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: (req as any).user.id
        },
        include: {
            products: true
        }
    });

    res.status(200);
    res.json({data: user.products ? user.products : [],errors: []});
}

export const getOneProduct = async (req: Request,res: Response) => {
    const id = req.params.id;
    const product = await prisma.product.findUnique({
        where: {
            id,
            belongsToId: (req as any).user.id
        }
    });

    res.status(200);
    res.json({data: product ? product : [] ,erros: []});
}

export const createProduct = async (req: Request, res: Response,next: NextFunction) => {
    try {
        console.log((req as any).user);
        const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: (req as any).user.id
        }
        });

        res.status(200);
        res.json({data: product,errors: []});
    } catch (error) {
        error.type = ERRORS.OTHER;
        next(error);
    }
    
    
}

export const updateProduct = async (req: Request,res: Response,next: NextFunction) => {
    try {
        const id = req.params.id;
        const updated = await prisma.product.update({
        where: {
            id,
            belongsToId: (req as any).user.id as string
        },
        data: {
            name: req.body.name
        }
    });

    res.status(200);
    res.json({data: updated,errors: []});
    } catch (error) {
        error.type = ERRORS.INPUT;
        next(error);
    }
    
}

export const deleteProduct = async (req: Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id;
        const deleted = await prisma.product.delete({
        where: {
            id,
            belongsToId: (req as any).user.id as string
           
        }
        });

    res.status(200);
    res.json({data: deleted,errors: []});
    } catch (error) {
        error.type = ERRORS.INPUT;
        next(error);
    }
    
}