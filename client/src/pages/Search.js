import React from 'react'
import {useParams} from "react-router-dom"

function Search() {
    const {param} = useParams()
    console.log(param);
    return (
        <div>
            <p>search works!</p>
        </div>
    )
}

export default Search;