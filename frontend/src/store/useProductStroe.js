import axios from "axios";
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
    }
}))