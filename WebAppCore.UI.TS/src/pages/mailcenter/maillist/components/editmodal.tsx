import { connect } from 'dva';
import React, { Component } from 'react';
import { Modal, Form, Input, Button, Radio, Select } from 'antd';
import { MailListType } from '../data';
import { FormComponentProps } from 'antd/es/form';
import { MailSendTypeType } from '../../mailsendtype/data';
import { MailSendEndType } from '../../mailsendend/data';
import { ModelState as MailListState } from '../model';
import { ModelState as MailSendEndState } from '../../mailsendend/model';
import { ModelState as MailSendTypeState } from '../../mailsendtype/model';


const FItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

export interface ModalProps {

    blnVisible: boolean;
    onOK: (v: MailListType) => void;
    onCancel: (e: any) => void
}

export interface ModalMixProps extends ModalProps, FormComponentProps {

    data: MailListType;
    mailSendTypeList: MailSendTypeType[];
    mailSendEndList: MailSendEndType[];
    blnVisible: boolean;
    onOK: (v: MailListType) => void;
    onCancel: () => void

}
export interface ModalState {
    //modalVisible: boolean;
}

@connect((
    { mailcenter_maillist, mailcenter_mailsendend, mailcenter_mailsendtype, }:
        {
            mailcenter_maillist: MailListState,
            mailcenter_mailsendend: MailSendEndState,
            mailcenter_mailsendtype: MailSendTypeState,
        }
) => ({
    data: mailcenter_maillist.CMail,
    mailSendEndList: mailcenter_mailsendend.MailSendEndList,
    mailSendTypeList: mailcenter_mailsendtype.MailSendTypeList,
}),
)

class EditModal extends Component<ModalMixProps, ModalState>{

    render() {
        const { data, mailSendTypeList, mailSendEndList, blnVisible, onOK, onCancel, form } = this.props;
        //const { modalVisible } = this.state;
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
        const handleSubmit = (e: any) => {
            e.preventDefault();

            form.validateFields((err, fieldsValue) => {
                if (err) {
                    return;
                }
                const v: MailListType = { ...data, ...fieldsValue, mailSendType: null, mailSendEnd: null };
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
                        {getFieldDecorator('MailSendTypeId', {
                            initialValue: data.MailSendTypeId,
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
    }
}

const WrappedEditModal = Form.create<ModalMixProps>()(EditModal);

export default WrappedEditModal;
