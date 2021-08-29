import React from 'react'
import pageNotFound from "../../assets/images/page_not_found.svg"
const PageNotFound = () => {
    return (
        <div style={{textAlign:"center", marginTop:"20px"}}>
            <img src={pageNotFound} width="90%" height="300px"/>
        </div>
    )
}

export default PageNotFound
