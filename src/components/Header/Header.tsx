import React from 'react';
import { Alignment, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, InputGroup, Icon } from "@blueprintjs/core";

interface IHeader {
    title: String;
    totalItems: number;
    handleSeach: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleClearFilter: (filterKey?: string) => void;
}
const Header: React.SFC<IHeader> = (props: IHeader) => (
    <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>{props.title}</NavbarHeading>
            <NavbarDivider />
            <InputGroup
                large={true}
                leftIcon="search"
                placeholder="Search Ramen Shops"
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => props.handleSeach(event)}
            />
            <Icon onClick={()=>props.handleClearFilter()} htmlTitle="Clear search" style={{cursor:'pointer'}} icon="delete"/>
            <NavbarDivider />
            Total Ramen shops: <b>{props.totalItems}</b>
        </NavbarGroup>
    </Navbar>
)


export default Header;
