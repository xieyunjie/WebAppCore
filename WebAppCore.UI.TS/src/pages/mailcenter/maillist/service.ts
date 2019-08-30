import request from '@/utils/request';
import { MailListType } from './data'

// const MC_Root = process.env.MC_ROOT;

const MC_Root = "/MC";

export async function GetMailList() {
    return request(`${MC_Root}/MailList/List`);
};

export async function SaveMailList(params: MailListType) {
    return request(`${MC_Root}/MailList/Save`, {
        method: 'POST',
        data: params,
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