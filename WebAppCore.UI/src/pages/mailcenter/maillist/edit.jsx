
import React, { Component } from 'react';
import { Table, Divider, Tag, Button, Spin, Modal } from 'antd';

const editModal = ({ data, blnVisible, onOK, onCancel }) => {
    return (
        <Modal
            title="Basic Modal"
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
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
};

export default editModal;