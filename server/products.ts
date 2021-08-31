
import { Request, Response } from "express";

export function getProducts(req: Request, res: Response) {
    setTimeout(()=> res.status(200).json({payload: Object.values(PRODUCTS)}), 5000);    
}

const PRODUCTS = 
[
    {
        "id": 1,
        "name": "HP Laptop",
        "description": "HP Laptop.",
        "price": "750.00",
        "quantity": 500
    },
    {
        "id": 2,
        "name": "Logitech keyboard",
        "description": "Logitech keyboard.",
        "price": "80.00",
        "quantity": 788
    },
    {
        "id": 3,
        "name": "Samsung mobile",
        "description": "Samsung mobile.",
        "price": "170.00",
        "quantity": 7444
    }
];