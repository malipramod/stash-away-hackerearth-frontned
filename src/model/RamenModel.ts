import { IconName, MaybeElement } from "@blueprintjs/core";

export interface RamenModel {
    Id: string;
    Brand: string;
    Variety: string;
    Style: string;
    Country: string;
    Stars: number | string;
    [Top_Ten: string]: any;
    Year?: string;
    Rank?: number;
}

export interface IAvailableFilters{
    name: string;
    value: Array<any>;
    filterType: string;
    id: string;
    Icon?: IconName | MaybeElement;
}

export interface IAppliedFilter {
    key: string;
    value: any;
    Icon?: IconName | MaybeElement;
}
