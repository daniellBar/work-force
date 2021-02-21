import React, { Component } from "react";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export class EmployeeSortingRow extends Component {

    state = {
        activeSort: 'name-up'
    }

    onClick = (sortBy) => {
        const activeSort = `${sortBy.by}-${sortBy.direction}`
        this.setState({ activeSort }, () => this.props.setSort(sortBy))
    }

    render() {
        const activeSort = this.state.activeSort
        return (
            <section className="employee-sorting-row flex">
                <div className="sort-col0"></div>
                <div className="sort-col1 name-sort flex">
                    <div className="sort-title">EMPLOYEE</div>
                    <div className="sort-btns flex">
                        <ArrowUpwardIcon onClick={() => this.onClick({ by: 'name', direction: 'up' })} fontSize='small' htmlColor={activeSort === 'name-up' ? '#0ec9ae' : ''} />
                        <ArrowDownwardIcon onClick={() => this.onClick({ by: 'name', direction: 'down' })} fontSize='small' htmlColor={activeSort === 'name-down' ? '#0ec9ae' : ''} />
                    </div>
                </div>
                <div className="sort-col2 salary-sort flex">
                    <div className="sort-title">SALARY</div>
                    <div className="sort-btns flex">
                        <ArrowUpwardIcon onClick={() => this.onClick({ by: 'salary', direction: 'up' })} fontSize='small' htmlColor={activeSort === 'salary-up' ? '#0ec9ae' : ''} />
                        <ArrowDownwardIcon onClick={() => this.onClick({ by: 'salary', direction: 'down' })} fontSize='small' htmlColor={activeSort === 'salary-down' ? '#0ec9ae' : ''} />
                    </div>
                </div>
                <div className="sort-col3 seniority-sort flex">
                    <div className="sort-title">SENIORITY</div>
                    <div className="sort-btns flex">
                        <ArrowUpwardIcon onClick={() => this.onClick({ by: 'seniority', direction: 'up' })} fontSize='small' htmlColor={activeSort === 'seniority-up' ? '#0ec9ae' : ''} />
                        <ArrowDownwardIcon onClick={() => this.onClick({ by: 'seniority', direction: 'down' })} fontSize='small' htmlColor={activeSort === 'seniority-down' ? '#0ec9ae' : ''} />
                    </div>
                </div>
                <div className="sort-col4 sort-title">MANAGE</div>
            </section>
        )
    }
}


