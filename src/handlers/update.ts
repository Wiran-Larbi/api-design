import prisma from "../db";
import { Request, Response } from "express";


export const getUpdates = async (req: Request,res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: (req as any).user.id
        },
        include: {
            updates: true
        }
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates,...product.updates];
    },[]);

    res.status(200);
    res.json({data: updates,errors: []})
}

export const getOneUpdate = async (req: Request,res: Response) => {
    const UpdateId = req.params.id;    
    const update = await prisma.update.findUnique({
            where: {
                id : UpdateId
            }
        });

    res.status(200);
    res.json({data: update,errors: []});
}
export const createUpdate = async (req: Request,res: Response) => {
    const ProductId = req.body.productId;
    // Checking if our product belongs to the current authorized user
    const product = await prisma.product.findUnique({
        where: {
            id: ProductId
        }
    });
    if (!product) {
        // does not belong to user
        res.status(401);
        return res.json({message: 'This Update does not belong to user 😕'});   
    }
    const update = await prisma.update.create({
        data: req.body
    });

    res.status(201);
    res.json({data: update});
    
}
export const updateUpdate = async (req: Request,res: Response) => {
    const UpdateId = req.params.id;
    const products = await prisma.product.findMany({
        where: {
            belongsToId: (req as any).user.id 
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates ,product) => {
        return [...allUpdates,...product.updates]
    },[]);
    const match = updates.find(update => update.id = UpdateId);
    
    if (!match) {
        // handle this
        res.status(401);
        return res.json({message: 'This Update does match nothing 😕'})
    }

    const updated = await prisma.update.update({
        where: {
            id: UpdateId
        },
        data: req.body
    });

    res.status(201);
    res.json({data: updated,errors: []});
    
}
export const deleteUpdate = async (req: Request,res: Response) => {
    const DeleteId = req.params.id;
    const products = await prisma.product.findMany({
        where: {
            belongsToId: (req as any).user.id 
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates ,product) => {
        return [...allUpdates,...product.updates]
    },[]);
    const match = updates.find(update => update.id = DeleteId);
    
    if (!match) {
        // handle this
        res.status(401);
        return res.json({message: 'This Update does match nothing 😕'})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: DeleteId
        }
    });

    res.status(200);
    res.json({data: deleted,errors: []});
}