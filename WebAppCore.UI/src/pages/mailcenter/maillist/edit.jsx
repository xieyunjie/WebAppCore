
import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const FItem = Form.Item;

const editModal = ({ data, blnVisible, onOK, onCancel, form }) => {
    const { getFieldDecorator } = form;
    return (
        <Modal
            title="编辑Modal"
            visible={blnVisible}
            // onOk={this.handleOk}
            // onCancel={this.handleCancel}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Return
            </Button>,
                <Button key="submit" type="primary" onClick={onOK}>
                    Submit
            </Button>,
            ]}
        >
            <Form>

            </Form>
        </Modal>
    )
};

export default editModal;