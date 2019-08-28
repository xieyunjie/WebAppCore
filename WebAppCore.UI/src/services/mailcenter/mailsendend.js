import request from '@/utils/request';

const MC_Root = process.env.MC_ROOT;

export async function GetMailSendEndList() {
  return request(`${MC_Root}/MailSendEnd/List`);
}