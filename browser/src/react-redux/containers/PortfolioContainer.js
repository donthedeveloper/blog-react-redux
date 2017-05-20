import React from 'react';

class PortfolioContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: ['Node', 'PHP', 'CSS'], 
            activeFilters: []
        }

        this.addFilter = this.addFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    addFilter(filter, activeFilters) {
        const changedActiveFilters = [...activeFilters];
        changedActiveFilters.push(filter);

        return changedActiveFilters;
    }

    removeFilter(filter, filterIndex, activeFilters) {
        const changedActiveFilters = this.state.activeFilters;  
        changedActiveFilters.splice(filterIndex, 1);

        return changedActiveFilters;
    }

    toggleFilter(e) {
        let activeFilters = this.state.activeFilters;
        const filterIndex = activeFilters.indexOf(filter);

        const activeFilterExists = (filterIndex > -1);

        if (activeFilterExists) {
            activeFilters = this.removeFilter(filter, activeFilters, filterIndex);
        } else {
            activeFilters = this.addFilter(filter, activeFilters);
        }

        console.log(activeFilters);

        this.setState({
            activeFilters: activeFilters
        })
    }

    render() {
        return (
            <div className='portfolio'>
                <h2>Portfolio</h2>
                <ul className='portfolio-filter'>
                    {
                        this.state.filters.map((filter, index) => {
                            const classValue = this.state.activeFilters.indexOf();
                            {/* TODO: On click, pass in filter value to search for */}
                            return <li className={classValue} key={index}><button onClick={this.toggleFilter}>{filter}</button></li>;
                        })
                    }
                </ul>
                <ul className='portfolio-gallery'>
                    <li><img src='http://lorempixel.com/200/200/' /></li>
                    <li><img src='http://lorempixel.com/200/200/' /></li>
                    <li><img src='http://lorempixel.com/200/200/' /></li>
                    <li><img src='http://lorempixel.com/200/200/' /></li>
                    <li><img src='http://lorempixel.com/200/200/' /></li>
                    <li><img src='http://lorempixel.com/200/200/' /></li>
                </ul>
            </div>
        )
    }
}

export default PortfolioContainer;