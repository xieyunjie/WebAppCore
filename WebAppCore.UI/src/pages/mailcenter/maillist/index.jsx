import { connect } from 'dva';
import React, { Component } from 'react';
import { Table, Divider, Tag, Button, Spin, message, Popconfirm } from 'antd';

import EditModal from './edit'

import styles from './index.less';


const AppFun = function ({ loading, data, editModalVisible, emptyMail, dispatch }) {

  const onEditClick = function (record) {
    dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: record, editModalVisible: true } });
  };
  const onDeleteClick = function (record) {
    dispatch({ type: 'mailcenter_maillist/DeleteMailList', payload: { id: record.Id } }).then((res) => {
      if (res.success === true) { 
        dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
        message.success(res.msg);
      }
      else {
        message.error(res.msg);
      }
    });
  };
  const columns = [
    {
      key: 'opr',
      title: '操作',
      render: (val, record) => (
        <span>
          <Button type="link" size="small" onClick={onEditClick.bind(null, record)}>编辑</Button>
          <Divider type="vertical" />
          {record.Status == true ? (<Button color="blue" size="small">禁用</Button>) : (<Button color="orange" size="small">启用</Button>)}
          <Divider type="vertical" />
          <Popconfirm title="是否确认删除此条数据？" onConfirm={onDeleteClick.bind(null, record)}   >
            <Button type="danger" size="small">删除</Button>
            </Popconfirm>
        </span>
      )
    }, {
      key: 'Id',
      title: 'ID',
      dataIndex: 'Id'
    }, {
      key: 'Name',
      title: '名称',
      dataIndex: 'Name',
    }, {
      key: 'DisplayName',
      title: '显示名称',
      dataIndex: 'DsplayName',
    }, {
      key: 'Subject',
      title: '主题',
      dataIndex: 'Subject',
    }, {
      key: 'MailSendEnd.Name',
      title: '发送邮箱',
      dataIndex: 'MailSendEnd.Name',
    }, {
      key: 'MailSendType.Name',
      title: '发送类型',
      dataIndex: 'MailSendType.Name',
    }, {
      key: 'IsHtml',
      title: '',
      dataIndex: 'IsHtml',
      render: (val, record) => (
        <span>
          {val == true ? (<Tag color="blue">√ HTML</Tag>) : (<Tag color="red">× HTML</Tag>)}
          <Divider type="vertical" />
          {record.Status == true ? (<Tag color="blue">启用</Tag>) : (<Tag color="orange">禁用</Tag>)}
        </span>
      )
    }];

  const clickFlash = (e) => {
    dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
  };
  const onAdd = e => {
    dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: emptyMail, editModalVisible: true } });
  }

  const editProps = {
    data: null,
    blnVisible: editModalVisible,
    onOK: (mailList) => {
      dispatch({ type: 'mailcenter_maillist/SaveMailList', payload: mailList }).then((res) => {
        if (res.success === true) {
          dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: emptyMail, editModalVisible: false } });
          dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
          message.success(res.msg);
        }
        else {
          message.error(res.msg);
        }
      });
    },
    onCancel: (e) => {
      dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: emptyMail, editModalVisible: false } });
    }
  };

  return (
    <Spin spinning={loading}>
      <Button type="primary" onClick={onAdd}>添加</Button>
      <Button type="primary" onClick={clickFlash} >flash</Button>
      <Table rowKey="Id" columns={columns} dataSource={data}></Table>
      <EditModal {...editProps}
      ></EditModal>
    </Spin>
  )
}

class AppCmp extends Component {
  componentDidMount() {
    // this.props.dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} }); 
    const p1 = this.props.dispatch({
      type: 'mailcenter_maillist/GetMailList',
      payload: {},
    }),
      p2 = this.props.dispatch({
        type: 'mailcenter_mailsendend/Init',
        payload: {},
      }),
      p3 = this.props.dispatch({
        type: 'mailcenter_mailsendtype/Init',
        payload: {},
      });

    Promise.all([p1, p2, p3]).then(() => {
    });
  }
  render = () => AppFun(this.props);
}
export default connect(state => {

  return {
    loading: state.loading.models.mailcenter_maillist,
    data: state.mailcenter_maillist.MailList,
    emptyMail: state.mailcenter_maillist.EmptyMail,
    editModalVisible: state.mailcenter_maillist.editModalVisible,
  };
})(AppCmp);