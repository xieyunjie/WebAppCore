import request from '@/utils/request';

export async function GetMailSendEndList() {
  return request('/MC/MailSendEnd/List');
}