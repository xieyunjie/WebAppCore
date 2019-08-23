import { connect } from 'dva';
import React, { Component } from 'react';

import styles from './index.less';


const AppFun = function({data}){
  return <div>New Page</div>;
}
 
class AppCmp extends Component{
  componentDidMount() { 
    console.info("!!!")
    this.props.dispatch({type:'mailcenter_maillist/GetMailList',payload:{}})
  }
  render = () => AppFun(this.props);
}
export default connect(state => {
  return { 
    data: state.mailcenter_maillist.MailList
  };
})(AppCmp);