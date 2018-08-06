import React, { Component } from 'react';
import { ExtReact,Container } from '@extjs/ext-react';

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.
Ext.require('Ext.plugin.Responsive');

export default class App extends Component {

    render() {
        return (
          <ExtReact>
            <Container fullscreen>
                StocksGrid
            </Container>
          </ExtReact>
        )
    }

}