import React, { Component, Dispatch } from 'react';
import { connect } from 'dva';

import { Divider, Tag, Button, Spin, message, Popconfirm, Table } from 'antd';

// import StandardTable, { StandardTableColumnProps } from './components/StandardTable';


import './index.less';
import { MailListType } from './data';
import { ModelState } from './model';

import { ModelState as MailSendResultState } from '../mailsendresult/model';
import EditModal, { ModalProps } from "./components/editmodal";
// import { FormComponentProps } from 'antd/es/form';

interface AppPrpos {
    loading: boolean;
    data: MailListType[];
    editModalVisible: boolean;
    emptyMail: MailListType;
    dispatch: Dispatch<any>;
}
interface AppState {
    modalVisible: boolean;
}

/* eslint react/no-multi-comp:0 */
@connect((
    { loading, mailcenter_maillist, mailcenter_mailsendresult }:
        {
            loading: { models: { [key: string]: boolean; }; };
            mailcenter_maillist: ModelState,
            mailcenter_mailsendresult: MailSendResultState,
        }
) => ({
    loading: loading.models.mailcenter_maillist,
    data: mailcenter_maillist.MailList,
    editModalVisible: mailcenter_maillist.editModalVisible,
    emptyMail: mailcenter_maillist.EmptyMail,
    date: mailcenter_mailsendresult.date
}),
)

class App extends Component<AppPrpos, AppState>{
    componentDidMount() {
        //this.props.dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
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
    render() {
        const { loading, data, editModalVisible, emptyMail, dispatch, date } = this.props;
        console.info(date);
        const onEditClick = function (record: MailListType) {
            dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: record, editModalVisible: true } });
        };
        const onDeleteClick = function (record: MailListType) {
            const callback = function (res: any) {
                if (res.success === true) {
                    dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
                    message.success(res.msg);
                }
                else {
                    message.error(res.msg);
                }
            }
            dispatch({ type: 'mailcenter_maillist/DeleteMailList', payload: { id: record.Id }, callback: callback });
            // dispatch({ type: 'mailcenter_maillist/DeleteMailList', payload: { id: record.Id } }).then((res) => {
            //     if (res.success === true) {
            //         dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
            //         message.success(res.msg);
            //     }
            //     else {
            //         message.error(res.msg);
            //     }
            // });
        };
        const clickFlash = (e: any) => {
            dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
        };
        const onAdd = (e: any) => {
            dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: emptyMail, editModalVisible: true } });
        };
        const columns = [
            {
                key: 'opr',
                title: '操作',
                render: (val: any, record: MailListType) => (
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
                render: (val: any, record: MailListType) => (
                    <span>
                        {val == true ? (<Tag color="blue">√ HTML</Tag>) : (<Tag color="red">× HTML</Tag>)}
                        <Divider type="vertical" />
                        {record.Status == true ? (<Tag color="blue">启用</Tag>) : (<Tag color="orange">禁用</Tag>)}
                    </span>
                )
            }];
        const editProps: ModalProps = {
            blnVisible: editModalVisible,
            onOK: (mailList: MailListType) => {
                const callback = (res: any) => {
                    if (res.success === true) {
                        dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: emptyMail, editModalVisible: false } });
                        dispatch({ type: 'mailcenter_maillist/GetMailList', payload: {} });
                        message.success(res.msg);
                    }
                    else {
                        message.error(res.msg);
                    }
                }
                dispatch({ type: 'mailcenter_maillist/SaveMailList', payload: mailList, callback: callback })
            },
            onCancel: (e: any) => {
                dispatch({ type: 'mailcenter_maillist/save', payload: { CMail: emptyMail, editModalVisible: false } });
            }
        };
        return (
            <Spin spinning={loading}>
                <Button type="primary" onClick={onAdd}>添加</Button>
                <Button type="primary" onClick={clickFlash} >flash</Button>
                <Table rowKey="Id" columns={columns} dataSource={data}></Table>
                {/* <EditModal {...editProps} ></EditModal>  */}
            </Spin>
        )

    }
}
// class App extends Component {
//     render() {
//         return (
//             <div className="App">
//                 <Button type="primary">Button</Button>
//             </div>
//         );
//     }
// }

// export default connect(() => {

//     return { 
//     };
// })(App);

export default App;