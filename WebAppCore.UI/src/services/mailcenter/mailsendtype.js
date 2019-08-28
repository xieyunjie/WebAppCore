import request from '@/utils/request';

const MC_Root = process.env.MC_ROOT;

export async function GetMailSendTypeList() {
  return request(`${MC_Root}/MailSendType/List`);
}