import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";
import ProductCart from "../components/ProductCart";
import { useProductStore } from "../store/useProductStroe";


const Home = () => {
    const { getProducts, error, loading, products } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);
    console.log(products)
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">

                <button className="btn btn-primary">
                    <PlusCircleIcon className="size-5 mr-2" />
                    Add Product</button>
                <button className="btn btn-ghost btn-circle" onClick={getProducts}>
                    <RefreshCwIcon className="size-5 " />
                </button>

            </div>
            {
                error && <div className="alert alert-error mb-8">{error}</div>
            }
            {
                loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loading loading-spinner loading-lg" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            products.map((product) => (
                                <ProductCart key={product.id} product={product} />
                            ))
                        }

                    </div>
                )
            }

        </main>
    )
}

export default Home