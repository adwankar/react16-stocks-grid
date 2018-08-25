import React, { Component } from 'react';
import { ExtReact,Container, Grid } from '@sencha/ext-react';
import StocksGrid from './StocksGrid';

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.
Ext.require('Ext.plugin.Responsive');

export default class App extends Component {

    render() {
        return (
            <ExtReact>
                <StocksGrid />
            </ExtReact>    
        )
    }

}