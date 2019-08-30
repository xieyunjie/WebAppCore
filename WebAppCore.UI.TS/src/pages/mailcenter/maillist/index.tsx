import React, { Component } from 'react';
import Button from 'antd/es/button';
import './index.less';
import { connect } from 'dva';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Button type="primary">Button</Button>
            </div>
        );
    }
}

export default connect(() => {

    return { 
    };
})(App);