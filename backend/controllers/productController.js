import { sql } from "../config/db.js";

export const getAllProducts=async(req,res)=>{
    try {
        const products=await sql`SELECT * FROM products
            ORDER BY created_at DESC;
        `;
        console.log(products)
        res.status(200).json({
            success: true,
           data: products
        })
        
    } catch (error) {
        console.log(
            "Error fetching products",
            error
        )
        
    }

}

export const createProduct=async ()=>{}

export const updateProduct=async ()=>{}

export const deleteProduct=async ()=>{}

export const getProductById=async ()=>{}