import request from '@/utils/request';

export async function GetMailList() {
  return request('/MC/MailList/List');
}