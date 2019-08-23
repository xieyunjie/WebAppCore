import { connect } from 'dva';
import React, { Component } from 'react';
import { Table, Divider, Tag, Button, Spin } from 'antd';

import EditModal from './edit'

import styles from './index.less';


const AppFun = function ({ loading, data, editModalVisible, dispatch }) {

  const columns = [
    {
      key: 'opr',
      title: '操作',
      render: (val, record) => (
        <span>
          <Button type="link" size="small">编辑</Button>
          <Divider type="vertical" />
          {record.status == true ? (<Button color="blue" size="small">禁用</Button>) : (<Button color="orange" size="small">启用</Button>)}
          <Divider type="vertical" />
          <Button type="danger" size="small">删除</Button>
        </span>
      )
    }, {
      key: 'id',
      title: 'id',
      dataIndex: 'id'
    }, {
      key: 'name',
      title: '名称',
      dataIndex: 'name',
    }, {
      key: 'displayName',
      title: '显示名称',
      dataIndex: 'displayName',
    }, {
      key: 'subject',
      title: '主题',
      dataIndex: 'subject',
    }, {
      key: 'isHtml',
      title: '',
      dataIndex: 'isHtml',
      render: (val, record) => (
        <span>
          {val == true ? (<Tag color="blue">√ HTML</Tag>) : (<Tag color="red">× HTML</Tag>)}
          <Divider type="vertical" />
          {record.status == true ? (<Tag color="blue">启用</Tag>) : (<Tag color="orange">禁用</Tag>)}
        </span>
      )
    }];

  const clickFlash = (e) => {
    dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
  };
  const onAdd = e => {
    dispatch({ type: 'mailcenter_maillist/save', payload: { editModalVisible: true } });
  }

  const editProps = {
    data: null,
    blnVisible: editModalVisible,
    onOK: (e) => {
      console.info("OKOKOK");
      dispatch({ type: 'mailcenter_maillist/save', payload: { editModalVisible: false } });
    },
    onCancel: (e) => {
      console.info("cancelcancel");
      dispatch({ type: 'mailcenter_maillist/save', payload: { editModalVisible: false } });
    }
  };

  return (
    <Spin spinning={loading}>
      <Button type="primary" onClick={onAdd}>添加</Button>
      <Button type="primary" onClick={clickFlash} >flash</Button>
      <Table rowKey="id" columns={columns} dataSource={data}></Table>
      <EditModal {...editProps} ></EditModal>
    </Spin>
  )
}

class AppCmp extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
  }
  render = () => AppFun(this.props);
}
export default connect(state => {

  return {
    loading: state.loading.models.mailcenter_maillist,
    data: state.mailcenter_maillist.MailList,
    editModalVisible: state.mailcenter_maillist.editModalVisible,
  };
})(AppCmp);