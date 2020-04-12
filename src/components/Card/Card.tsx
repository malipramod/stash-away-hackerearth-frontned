import React from 'react';
import { Card, Elevation, Tag } from "@blueprintjs/core";
import { RamenModel } from '../../model/RamenModel';
import Rating from './Rating/Rating';

interface RamenCardProps {
    ramenShop: RamenModel
}
const RamenCard: React.SFC<RamenCardProps> = (props: RamenCardProps) => {
    return (
        <>
            <Card interactive={true} elevation={Elevation.TWO} style={{ margin: "10px" }}>
                <h4>{props.ramenShop.Brand}</h4>
                <h6>{props.ramenShop.Variety}</h6>
                <Tag style={{ margin: '0px 5px' }} icon="map-marker" round={true} title="Country">{props.ramenShop.Country}</Tag>
                {props.ramenShop.Style.toLowerCase() !== "nan" ? <Tag style={{ margin: '0px 5px' }} icon="box" round={true} title="Style">{props.ramenShop.Style}</Tag> : null}
                {props.ramenShop.Rank !== 0 && props.ramenShop.Year !== "0000" ? <Tag style={{ margin: '0px 5px' }} icon="map-marker" round={true} title="Rank in Year">{`#${props.ramenShop.Rank} in ${props.ramenShop.Year}`}</Tag> : null}
                <Rating rating={props.ramenShop.Stars}></Rating>
            </Card>
        </>
    )
}

export default RamenCard;
