import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer/Footer'
import PageNotFound from './PageNotFound'

function Blog() {

    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ blog, setBlog ] = useState({})

    async function getAndSetBlog(_id){

        const response = await fetch(`/api/blog?_id=${_id}`)
        const data = await response.json()

        if(data == []){
            setBlog(null)
        }
        else{
            setBlog(data[0])
        }
    }

    useEffect( () => {

        getAndSetBlog(searchParams.get('_id'))
    }, [])
    
    if(blog){
        return (
            <>
                <Navbar />
                <h1>{blog.thumbnailText}</h1>
                <img src={`/images/${blog.thumbnailImg}`} style={{height: 300, width: 300}} />
                
                <div>
                    {/* error in rendering content */}
                </div>
                <Footer />
            </>
        )
    }
    else{
        return(<PageNotFound />)
    }
}

export default Blog