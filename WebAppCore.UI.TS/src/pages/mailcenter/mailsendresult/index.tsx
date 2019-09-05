import React, { Component, Dispatch } from 'react';
import { connect } from 'dva'; 

import { ModelState } from './model';

interface AppPrpos {
    result: number,
    date: string
}
interface AppState {
}
/* eslint react/no-multi-comp:0 */
@connect((
    { mailcenter_mailsendresult }:
        {
            mailcenter_mailsendresult: ModelState
        }
) => ({
    result: mailcenter_mailsendresult.result,
    date: mailcenter_mailsendresult.date
}),
)
class App extends Component<AppPrpos, AppState>{
    render() {
        const { result, date } = this.props;
        return (
            <div>
             <div>{result}</div>
                <div>{date}</div>
            </div>
        )
    }
}

export default App;

 

