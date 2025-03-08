import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiRequest from '../../utils/apiRequest';
import { API } from '../../constants/API';

export default function Product() {

    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiRequest(API.product + '/' + id)
            .then(data => {
                if(data.product){
                    setProduct(data.product)
                    console.log(data.product)
                }
                setLoading(false)
            })
            .catch(error => {
                console.error('Product fetch failed', error)
                setLoading(false)
            })
    }, [])

    return (
        <>
            <Navbar />
            {loading ?
            <></>
            :
            <div className='flex flex-row justify-center items-center p-20'>
                <div className='w-1/2 p-5 rounded-2xl'>
                    <img src={product.product_image[0].image_url} alt={product.name} />
                </div>
                <div className='flex-1 flex flex-col self-start gap-5'>
                    <h1 className='ubuntu-sans-mono-700 text-4xl text-[#454545]'>{product.name}</h1>
                    <h2 className='price text-2xl text-[#454545]'>{product.price.toLocaleString()} THB</h2>

                    {
                        product.product_size.length > 0 &&
                        <>
                            <h3 className='vazirmatn-700 text-3xl '>SIZE</h3>
                            <div className='flex flex-row gap-5'>
                                {product.product_size.map(size => <button key={size.id} className='btn trispace text-[#454545]'>{size.size}</button>)}
                            </div>
                        </>
                        
                    }
                </div>
            </div>}

        </>
    )
}