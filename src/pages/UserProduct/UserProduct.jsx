import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiRequest from '../../utils/apiRequest';
import { API } from '../../constants/API';
import { Link } from 'react-router-dom';
export default function UserProduct() {
    const { id } = useParams();

    const [owner, setOwner] = useState(null)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiRequest(API.product + '/myproducts/' + id)
            .then(data => {
                if(data.products.length > 0){
                    setProduct(data.products)
                }

                if(data.user){
                    setOwner(data.user)
                }

                setLoading(false)
            })
            .catch(error => {
                console.error('product fetch failed', error)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        apiRequest(API.product + '/myproducts/' + id)
            .then(data => {
                if(data.products.length > 0){
                    setProduct(data.products)
                }

                if(data.user){
                    setOwner(data.user)
                }

                setLoading(false)
            })
            .catch(error => {
                console.error('product fetch failed', error)
                setLoading(false)
            })
    }, [id])
    
    return (
        <>
            <Navbar />
            {loading ?
            <>
               {owner && <h1 className='ubuntu-sans-mono-400 text-4xl text-center mt-10'>{owner.name.toUpperCase()} {owner.surname.toUpperCase()}</h1>}
            
                <div className='flex flex-row justify-center w-full gap-10 flex-wrap mt-10'>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                    <div className='h-64 w-64 skeleton '></div>
                </div>
            </>
            :
            product ?
            <>
                <h1 className='ubuntu-sans-mono-400 text-4xl text-center mt-10'>{owner.name.toUpperCase()} {owner.surname.toUpperCase()}</h1>
            
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 mx-auto place-items-center'>
                    {product.map((item, index) => 
                        <Link to={`/product/${item.id}`} key={item.id} className='w-64 h-fit flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transform transition-transform duration-300'>
                            <img src={item.product_image[0].image_url} alt={item.name} className='h-48 w-48 object-cover' />
                            <div className='flex flex-col gap-2'>
                                {index < 3 && <h1 className='ubuntu-sans-mono-700 text-2xl w-full text-[#CF6A6A]'>NEW PRODUCT</h1>}
                                <h1 className='ubuntu-sans-mono-700 text-lg w-full'>{item.name}</h1>
                                <h2 className='ubuntu-sans-mono-400 text-lg w-full'>{item.price.toLocaleString()} THB</h2>
                            </div>
                        </Link>
                    )}
                </div>
            </>
            :
            <div className='flex flex-col md:flex-row justify-center items-center min-h-screen h-full'>
                <h1 className='ubuntu-sans-mono-700 text-4xl text-[#454545]'>No products found.</h1>
            </div>
            }

        </>
    )
}