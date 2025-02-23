import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const BASE_URL= "http://localhost:6001";

export const useProductStore= create((set,get)=>({
    products: [],
    loading: true,
    error: null,
   // form state
   formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().getProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

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