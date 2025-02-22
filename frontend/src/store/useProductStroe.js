import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const BASE_URL= "http://localhost:6001";

export const useProductStore= create((set)=>({
    products: [],
    loading: true,
    error: null,
    getProducts: async ()=>{
        try{
            set({loading: true, error: null});
            const response= await axios.get(`${BASE_URL}/api/products`);
            set({products: response.data.data, loading: false});
        }catch(error){
            set({loading: false, error: error.message, products: [],});
        }
    },
    deleteProduct:async(id)=>{
        set({loading: true, })
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
           set(prev=>({products: prev.products.filter(product=>product.id!== id)}))
           toast.success("Product deleted successfully")  
        } catch (error) {
            set({loading: false, error: error.message,});
            toast.error(error.message)
            
        }finally{
            set({loading: false,})
        }
    }
}))