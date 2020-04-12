import React from 'react';
import { Icon } from "@blueprintjs/core";

interface IRating {
    rating: string | number
}
const Rating = (props: IRating) => (
    <div style={{ padding: '2px' }}>
        {
            props.rating.toString().toLowerCase() !== "nan" ?
                [...Array(Math.floor(parseFloat(props.rating.toString())))].map((e, i) => <Icon htmlTitle={props.rating.toString()} key={i} icon="star" intent="success" />)
                : "Rating Not Available"}
    </div>
)

export default Rating;
