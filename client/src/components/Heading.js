import React from "react";

function Heading(props) {
    return(
        <section className="heading">
            <h1>{ props.title }</h1>
            <h4>{ props.subtitle }</h4>
        </section>
    )
}

export default Heading;