import { connect } from 'dva';
import React, { Component } from 'react';
import { Modal, Form, Input, Button, Radio } from 'antd';

const FItem = Form.Item;
const { TextArea } = Input;

const editModal = ({ data, blnVisible, onOK, onCancel, form }) => {
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

            console.info(fieldsValue);
            const v = { ...fieldsValue };
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
                    {getFieldDecorator("name", {
                        initialValue: data.name,
                        rules: [{
                            required: true,
                            message: '请输入显示名称',
                        }]
                    })(<Input />)}
                </FItem>
                <FItem label="显示名称">
                    {getFieldDecorator("displayName", {
                        initialValue: data.displayName,
                        rules: [{
                            required: true,
                            message: '请输入显示名称',
                        }]
                    })(<Input />)}
                </FItem>
                <FItem label="邮件主题">
                    {getFieldDecorator("subject", {
                        initialValue: data.subject,
                        rules: [{
                            required: true,
                            message: '请输入邮件主题',
                        }]
                    })(<Input />)}
                </FItem>
                <FItem label="是否Html">
                    {getFieldDecorator('isHtml', { initialValue: data.isHtml })(
                        <Radio.Group>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>,
                    )}
                </FItem>
                <FItem label="邮件内容">
                    {getFieldDecorator("mailBody", { initialValue: data.mailBody })(
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
        data: state.mailcenter_maillist.CMail
    };
})(WrappedEditModal);

//export default WrappedEditModal;