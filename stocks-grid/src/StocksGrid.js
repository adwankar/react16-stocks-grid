import React, { Component } from 'react';
import { ExtReact,Container } from '@sencha/ext-react';
import { Grid, Column } from '@sencha/ext-react';
import stocks from '../data/stocks';


export default class StocksGrid extends Component {

    constructor() {
        super();
        this.store = new Ext.data.Store({
            data: stocks,
            autoLoad: true,
            sorters: [{
                property: 'name'
            }],
            listeners: {
                update: this.onRecordUpdated
            }
        })
    }

    onRecordUpdated = (store, record, operation, modifiedFieldNames) => {
        const field = modifiedFieldNames[0];
        Ext.toast(`${record.get('name')} ${field} updated to ${record.get(field)}`)
    }

    render() {
        return (
           <Grid
                ref={grid => this.grid = grid} 
                store={this.store}
           >
                <Column dataIndex="name" text="Name" width={300} />
                <Column dataIndex="symbol" text="Symbol" />
                <Column dataIndex="ticks" text="Trend" />
                <Column dataIndex="sector" text="Sector" width={200} />
                <Column dataIndex="industry" text="Industry" width={350} />
            </Grid>
        );
    }

}