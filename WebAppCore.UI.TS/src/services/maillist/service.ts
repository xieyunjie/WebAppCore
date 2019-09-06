import request from '@/utils/request';
import { MailListType } from '@/models/maillist/data'

// const MC_Root = process.env.MC_ROOT;

const MC_Root = "/MC";

export async function GetMailList() {
    return request(`${MC_Root}/MailList/List`);
};

export async function SaveMailList(params: MailListType) {
    console.info(params);
    return request(`${MC_Root}/MailList/Save`, {
        method: 'POST',
        data: {
            DisplayName: 2,
            Id: 0,
            IsHtml: true,
            MailBody: 123,
            MailSendEndId: 1,
            MailSendTypeId: 1,
            Name: 1,
            Status: 1,
            Subject: 3,
        },
        requestType: 'form',
    });
};

export async function DeleteMailList(params: MailListType) {
    return request(`${MC_Root}/MailList/Delete`, {
        method: 'POST',
        data: params,
        requestType: 'form',
    });
}