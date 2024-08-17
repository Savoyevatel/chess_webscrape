import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'


function ProductScreen() {
    const [product, setProduct] = useState([])
    const { id } = useParams()


    useEffect(() => {
        async function fetchProduct(){
            const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
            setProduct(data)
        }

        fetchProduct()
    
    }, [])

    return (
        <div>
            hi
        </div>
    )
}

export default ProductScreen
