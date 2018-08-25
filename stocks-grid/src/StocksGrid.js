import React, { Component } from 'react';
import { ExtReact, Container } from '@sencha/ext-react';
import { Grid, Column, Button, WidgetCell } from '@sencha/ext-modern';
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

    buyHandler = (button) => {
        let gridrow = button.up('gridrow'),
        record = gridrow.getRecord();
        Ext.toast(`Buy ${record.get('name')}`)
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
                <Column >
                    <WidgetCell>
                        <Button ui="round action" className="x-item-no-select" handler={this.buyHandler} text="Buy" />
                    </WidgetCell>
                </Column>
                <Column dataIndex="name" text="Name" width={300} cell={{ style: { fontWeight: 'bold' } }} />
                <Column dataIndex="symbol" text="Symbol" />
                <Column dataIndex="ticks" text="Trend" />
                <Column dataIndex="sector" text="Sector" width={200} />
                <Column dataIndex="industry" text="Industry" width={350} />
                
            </Grid>
        );
    }

}