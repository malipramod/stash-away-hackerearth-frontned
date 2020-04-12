import { v4 as uuidv4 } from 'uuid';
import { RamenModel, IAvailableFilters, IAppliedFilter } from "../model/RamenModel";

export const transformData = (data: Array<RamenModel>) => {
    const updatedData = data.map((ramen: RamenModel) => {
        const rank = ramen["Top Ten"] === "NaN" ? "0" : ramen["Top Ten"].split(" ")[1].substr(1);
        const year = ramen["Top Ten"] === "NaN" ? "0000" : ramen["Top Ten"].split(" ")[0];
        const id = uuidv4();
        return { ...ramen, Id: id, Rank: rank, Year: year }
    });
    return updatedData;
}

export const createFilters = (data: Array<RamenModel>): Array<IAvailableFilters> => {
    const uniqueCountries = _createFilter(data, "Country");
    const uniqueYears = _createFilter(data, "Year").filter(year => year !== "0000");
    const uniqueStyle = _createFilter(data, "Style").filter((style: any | string) => style.toLowerCase() !== "nan");
    return [
        { name: "Years", id: "Year", value: uniqueYears, filterType: "dropdown", Icon:"calendar" },
        { name: "Countries", id: "Country", value: uniqueCountries, filterType: "checkbox", Icon: "map-marker" },
        { name: "Style", id: "Style", value: uniqueStyle, filterType: "checkbox", Icon: "box" }
    ];
}

const _createFilter = (data: Array<RamenModel>, filterValue: string) => {
    const filteredValues = new Set();
    data.filter((ramen: RamenModel) => {
        if (filteredValues.has(ramen[filterValue])) {
            return false;
        }
        filteredValues.add(ramen[filterValue]);
        return true;
    });
    return Array.from(filteredValues);
}

export const filterData = (data: Array<RamenModel>, appliedFilters: Array<IAppliedFilter>) => {
    if (appliedFilters.length === 0) return data;
    let newFilterData: Array<RamenModel> = [];
    data.forEach((d: RamenModel) => {
        for(let appliedFilter of appliedFilters){
            if (d[appliedFilter.key] === appliedFilter.value) {                
                const alreadyExists = newFilterData.some(newFilter=>newFilter.Id === d.Id);
                if (!alreadyExists) newFilterData.push(d);
            }
        }
    });
    return newFilterData;
}

export const clearFilter = (appliedFilters: Array<IAppliedFilter>, filterKey?: string) => {
    if(!filterKey) return [];
    return appliedFilters.filter(appliedFilter => appliedFilter.key !== filterKey);
}

export const searchShops = (data: Array<RamenModel>, searchText: string) => {
    if (!searchText) return data;
    return data.filter(d => 
                            d.Brand.toLowerCase().includes(searchText.toLowerCase()) || 
                            d.Variety.toLowerCase().includes(searchText.toLowerCase()) ||
                            d.Style.toLowerCase().includes(searchText.toLowerCase()) ||
                            d.Country.toLowerCase().includes(searchText.toLowerCase())
                        )
}
