import React from 'react';
import { Checkbox, H5, HTMLSelect, IconName, MaybeElement, Icon } from "@blueprintjs/core";

interface IFilterProps {
    filterName: string;
    values: Array<any>;
    filterType: string;
    id: string;
    handleFilterChange: (event: React.MouseEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, filterType: string, id: string, icon?: IconName | MaybeElement) => void;
    handleClearFilter: (filterKey?: string) => void;
    icon?: IconName | MaybeElement
}


const RamenFilter = (props: IFilterProps) => (
    <React.Fragment>
        <H5>{props.filterName} <Icon htmlTitle={`Clear ${props.filterName} Filter`} onClick={()=>props.handleClearFilter(props.id)} style={{cursor:'pointer'}} icon="delete"/></H5> 
        {props.filterType === "checkbox" ?
            props.values.map(value => (
                <Checkbox value={value} label={value} key={value.toLowerCase().replace(/ /g, "_")} onClick={(event: React.MouseEvent<HTMLInputElement>) => props.handleFilterChange(event, props.filterType, props.id, props.icon)} />
            )) : null
        }
        {props.filterType === "dropdown" ?
            <HTMLSelect className="bp3-fill bp3-large" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => props.handleFilterChange(event, props.filterType, props.id, props.icon)}>
                {props.values.map(value => (
                    <option key={value.toLowerCase().replace(/ /g, "_")} value={value}>{value}</option>
                ))}
            </HTMLSelect>
            : null
        }
    </React.Fragment>
)

export default RamenFilter;
