import React from 'react';
import axios from '../../utility/axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Spinner, Tag, IconName, MaybeElement, Icon } from '@blueprintjs/core';
import { RamenModel, IAvailableFilters, IAppliedFilter } from '../../model/RamenModel'
import Header from '../Header/Header';
import RamenCard from '../Card/Card';
import RamenFilter from '../Filter/Filter';
import { transformData, createFilters, searchShops, filterData, clearFilter } from '../../utility/processData';

type OwnProps = {}

interface OwnState {
    data: Array<RamenModel>;
    filteredData: Array<RamenModel>;
    loading: boolean;
    availbleFilters: Array<IAvailableFilters>;
    appliedFilters: Array<IAppliedFilter>;
}

export default class Main extends React.Component<OwnProps, OwnState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            filteredData: [],
            loading: true,
            availbleFilters: [],
            appliedFilters: []
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleClearFilter = this.handleClearFilter.bind(this);
    }

    componentDidMount() {
        axios.get('TopRamen')
            .then((res: any) => {
                const updatedData: Array<RamenModel> = transformData(res.data);
                const availbleFilters: Array<IAvailableFilters> = createFilters(updatedData);
                this.setState({
                    data: updatedData,
                    filteredData: updatedData,
                    availbleFilters: availbleFilters
                })
            })
            .catch((err: any) => { throw new Error(err) })
            .finally(() => this.setState({ loading: false }))
    }

    handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            const updateFilteredData = searchShops(this.state.data, (event.target as HTMLInputElement).value)
            this.setState({ filteredData: updateFilteredData, appliedFilters: [] });
        }
    }

    handleFilterChange(event: React.MouseEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, filterType: string, id: string, icon?: IconName | MaybeElement) {
        if (filterType === "dropdown") {
            const filterValue = (event.target as HTMLInputElement).value;
            let newAppliedFilters = this.state.appliedFilters;

            const isFilterApplied = newAppliedFilters.some(newAppliedFilter => newAppliedFilter.key === id);
            if (isFilterApplied) {
                newAppliedFilters = newAppliedFilters.map(newAppliedFilter => {
                    if (newAppliedFilter.key === id)
                        newAppliedFilter.value = filterValue
                    return newAppliedFilter;
                })
            }
            else
                newAppliedFilters.push({ key: id, value: filterValue, Icon: icon });

            this.setState({ appliedFilters: newAppliedFilters }, () => {
                const newFilteredData = filterData(this.state.data, this.state.appliedFilters);
                this.setState({ filteredData: newFilteredData });
            });
        } else if (filterType === "checkbox") {
            const filterValue = (event.target as HTMLInputElement).value;
            let newAppliedFilters = this.state.appliedFilters;
            const isChecked = (event.target as HTMLInputElement).checked;
            if (isChecked) {
                newAppliedFilters.push({ key: id, value: filterValue, Icon: icon });
            } else {
                newAppliedFilters = newAppliedFilters.filter(appliedFilter => appliedFilter.value !== filterValue);
            }

            this.setState({ appliedFilters: newAppliedFilters }, () => {
                const newFilteredData = filterData(this.state.data, this.state.appliedFilters);
                this.setState({ filteredData: newFilteredData });
            })
        } else {
            console.log("Filter is missing");
        }
    }

    handleClearFilter(filterKey?: string) {
        const newAppliedFilter = clearFilter(this.state.appliedFilters, filterKey);
        this.setState({ appliedFilters: newAppliedFilter },()=>{
                const newFilteredData = filterData(this.state.data, this.state.appliedFilters);
                this.setState({ filteredData: newFilteredData });
        });
    }
    render() {
        let main = (<Spinner intent="primary" size={Spinner.SIZE_STANDARD} />)
        if (!this.state.loading) {
            main = (<Container>
                <Row>
                    <Col>
                        <Header 
                        title="Welcome to Ramen Shop" 
                        totalItems={this.state.filteredData.length}
                        handleSeach={this.handleSearch}
                        handleClearFilter={this.handleClearFilter}/>
                    </Col>
                </Row>
                {
                    this.state.appliedFilters.length > 0 ? <Row style={{ margin: '10px' }}>
                        Applied Filters: {this.state.appliedFilters.map((appliedFilter: IAppliedFilter) =>
                            <Tag key={appliedFilter.value} style={{ margin: '0px 5px' }} icon={appliedFilter.Icon} round={true} title={`${appliedFilter.key}-${appliedFilter.value}`}>{appliedFilter.Icon ? null : appliedFilter.key + ": "} {appliedFilter.value}</Tag>
                        )}
                        {<Icon onClick={() => this.handleClearFilter()} htmlTitle="Clear All filters" style={{ cursor: 'pointer' }} icon="delete" />}
                    </Row> : null
                }
                <Row>
                    <Col xs={3}>
                        {
                            this.state.availbleFilters.map((filter: IAvailableFilters) =>
                                <RamenFilter
                                    key={filter.name}
                                    filterName={filter.name}
                                    values={filter.value}
                                    filterType={filter.filterType}
                                    id={filter.id}
                                    handleFilterChange={this.handleFilterChange}
                                    handleClearFilter={this.handleClearFilter}
                                    icon={filter.Icon}
                                />)
                        }
                    </Col>
                    <Col xs={9}>
                        {
                            this.state.filteredData.length === 0 ? <h1>No shops found</h1> : this.state.filteredData.map((ramenShop: RamenModel) => (<RamenCard key={ramenShop.Id} ramenShop={ramenShop}></RamenCard>))
                        }
                    </Col>
                </Row>
            </Container>)
        }
        return (
            main
        )
    }
}
