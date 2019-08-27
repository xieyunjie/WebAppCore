import { connect } from 'dva';
import React, { Component } from 'react';
import { Table, Divider, Tag, Button, Spin } from 'antd';

import EditModal from './edit'

import styles from './index.less';


const AppFun = function ({ loading, data, editModalVisible, dispatch }) {

  const onEditClick = function (record) {
    dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: record, editModalVisible: true } });
  };
  const columns = [
    {
      key: 'opr',
      title: '操作',
      render: (val, record) => (
        <span>
          <Button type="link" size="small" onClick={onEditClick.bind(null, record)}>编辑</Button>
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
    const CMail = {
      id: 0,
      name: '',
      displayName: '',
      subject: '',
      mailBody: '',
      isHtml: true,
      mailSendTypeId: 1,
      mailSendEndId: 1,
      status: 1,
      mailSendEnd: '',
      mcMailReceiveEnd: []
    };
    dispatch({ type: 'mailcenter_maillist/save', payload: { CMail, editModalVisible: true } });
  }

  const editProps = {
    data: null,
    blnVisible: editModalVisible,
    onOK: (e) => {
      console.info("OKOKOK");
      // const { form } = formRef.props;
      // form.validateFields((err, values) => {
      //   if (err) {
      //     return;
      //   }

      //   console.log('Received values of form: ', values);
      //   form.resetFields();
      //   // dispatch({ type: 'mailcenter_maillist/save', payload: { editModalVisible: false } });
      // });
      dispatch({ type: 'mailcenter_maillist/save', payload: { editModalVisible: false } });
    },
    onCancel: (e) => {
      console.info("cancelcancel");
      dispatch({ type: 'mailcenter_maillist/save', payload: { editModalVisible: false } });
    }
  };

  // let formRef = null;

  // const saveFormRef = form => {
  //   formRef = form;
  // };

  return (
    <Spin spinning={loading}>
      <Button type="primary" onClick={onAdd}>添加</Button>
      <Button type="primary" onClick={clickFlash} >flash</Button>
      <Table rowKey="id" columns={columns} dataSource={data}></Table>
      <EditModal {...editProps} 
      // wrappedComponentRef={saveFormRef}
      ></EditModal>
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