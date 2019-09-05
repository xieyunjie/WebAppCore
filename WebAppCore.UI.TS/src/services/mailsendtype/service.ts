import request from '@/utils/request';

// const MC_Root = process.env.MC_ROOT;

const MC_Root = "/MC"; 

export async function GetMailSendTypeList() {
    return request(`${MC_Root}/MailSendType/List`);
}