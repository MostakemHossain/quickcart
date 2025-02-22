/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { EditIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCart = ({ product }) => {
    return (
        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
            <figure className='relative pt-[56.25%]'>
                <img
                    src={product.image}
                    alt={product.name}
                    className='absolute top-0 left-0 w-full h-full object-cover'
                />

            </figure>
            <div className='card-body'>
                <h1 className='card-title text-lg font-semibold'>{product.name}</h1>
                <p className='text-2xl font-bold text-primary'>
                    ${Number(product.price).toFixed(2)}
                </p>
                <div className='card-actions justify-end mt-4'>
                    <Link to={`/product/${product.id}`} className='btn btn-sm btn-info btn-outline'>
                        <EditIcon className="size-4" />
                    </Link>
                    <button className='btn btn-sm btn-error btn-outline'>
                        <TrashIcon className="size-4" />

                    </button>

                </div>

            </div>
        </div>
    )
}

export default ProductCart