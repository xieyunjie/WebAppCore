import { connect } from 'dva';
import React, { Component } from 'react';
import { Modal, Form, Input, Button, Radio, Select } from 'antd';

const FItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const editModal = ({ data, mailSendTypeList, mailSendEndList, blnVisible, onOK, onCancel, form }) => {
    const { getFieldDecorator } = form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const handleSubmit = e => {
        e.preventDefault();

        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }  
            
            const v = { ...data, ...fieldsValue, MailSendType: null, MailSendEnd: null }; 
            onOK(v);
        });
    };
    return (
        <Modal
            title="编辑Modal"
            visible={blnVisible}
            okText="保存"
            onCancel={onCancel}
            footer={null}
        >
            <Form {...formItemLayout} onSubmit={handleSubmit}>
                <FItem label="名称">
                    {getFieldDecorator("Name", {
                        initialValue: data.Name,
                        rules: [{
                            required: true,
                            message: '请输入显示名称',
                        }]
                    })(<Input />)}
                </FItem>
                <FItem label="显示名称">
                    {getFieldDecorator("DisplayName", {
                        initialValue: data.DisplayName,
                        rules: [{
                            required: true,
                            message: '请输入显示名称',
                        }]
                    })(<Input />)}
                </FItem>
                <FItem label="邮件主题">
                    {getFieldDecorator("Subject", {
                        initialValue: data.Subject,
                        rules: [{
                            required: true,
                            message: '请输入邮件主题',
                        }]
                    })(<Input />)}
                </FItem>
                <FItem label="邮件类型">
                    {getFieldDecorator('MailSendTypeId', {
                        initialValue: data.MailSendTypeId,
                        rules: [{
                            required: true,
                            message: '请选择邮件类型',
                        }]
                    })(
                        <Select>
                            {
                                mailSendTypeList.map((item, idx) => {
                                    return <Option key={item.Id} value={item.Id}>{item.Name}</Option>
                                })
                            }
                        </Select>
                    )}
                </FItem>
                <FItem label="发送端">
                    {getFieldDecorator('MailSendEndId', {
                        initialValue: data.MailSendEndId,
                        rules: [{
                            required: true,
                            message: '请选择发送端',
                        }]
                    })(
                        <Select>
                            {
                                mailSendEndList.map((item, idx) => {
                                    return <Option key={item.Id} value={item.Id}>{item.Name}</Option>
                                })
                            }
                        </Select>
                    )}
                </FItem>
                <FItem label="是否Html">
                    {getFieldDecorator('IsHtml', { initialValue: data.IsHtml })(
                        <Radio.Group>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    )}
                </FItem>
                <FItem label="邮件内容">
                    {getFieldDecorator("MailBody", { initialValue: data.MailBody })(
                        <TextArea autosize={{ minRows: 3, maxRows: 5 }} />
                    )}

                </FItem>
                <FItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        保存</Button>
                    <Button type="link" onClick={onCancel} >
                        取消</Button>
                </FItem>
            </Form>
        </Modal>
    )
};

const WrappedEditModal = Form.create({ name: 'editModal' })(editModal);


export default connect(state => {

    return {
        data: state.mailcenter_maillist.CMail,
        mailSendTypeList: state.mailcenter_mailsendtype.MailSendTypeList,
        mailSendEndList: state.mailcenter_mailsendend.MailSendEndList
    };
})(WrappedEditModal);

//export default WrappedEditModal;