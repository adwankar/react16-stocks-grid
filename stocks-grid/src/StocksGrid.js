import React, { Component } from 'react';
import { ExtReact, Container } from '@sencha/ext-react';
import { Grid, Column, Button, WidgetCell, SparkLineLine, TitleBar, Menu, MenuItem, SelectField } from '@sencha/ext-modern';
import stocks from '../data/stocks';

Ext.require([
    'Ext.Toast',
    'Ext.grid.plugin.*',
    'Ext.exporter.*'
]);

let sectors = Array.from(new Set(stocks.map(stock => stock.sector))).map(sector => {
    return { text: sector, value: sector }
})

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

    export = (type) => { this.grid.cmp.saveDocumentAs(
        { type, title: 'Stocks' });
    }


    render() {
        return (
            <Grid
                ref={grid => this.grid = grid}
                store={this.store}
                plugins={{
                    gridexporter: true,
                    gridcellediting: true
                  }}
                    
            >
            <TitleBar docked="top" title="Stocks">
                    <Button align="right" text="Export">
                        <Menu indented={false}>
                            <MenuItem text="Excel" handler={this.export.bind(this, 'excel07')}/>
                            <MenuItem text="CSV" handler={this.export.bind(this, 'csv')}/>
                        </Menu>
                    </Button>
                </TitleBar>

                <Column ignoreExport>
                    <WidgetCell>
                        <Button ui="round action" className="x-item-no-select" handler={this.buyHandler} text="Buy" />
                    </WidgetCell>
                </Column>
                <Column dataIndex="name" text="Name" width={300} cell={{ style: { fontWeight: 'bold' } }} editable />
                <Column dataIndex="symbol" text="Symbol" />
                <Column dataIndex="ticks" text="Trend" sortable={false} ignoreExport
                    cell = { { 
                            xtype: 'widgetcell',
                            forceWidth: true,
                            widget: {
                                    xtype: 'sparklineline',
                                    tipTpl:'Price: {y:number("0.00")}'
                        }
                    } }
                />
                <Column dataIndex="sector" text="Sector" width={200} editable>
                    <SelectField options={sectors}/>
                </Column>
                <Column dataIndex="industry" text="Industry" width={350} editable />
                
                
            </Grid>
        );
    }

}