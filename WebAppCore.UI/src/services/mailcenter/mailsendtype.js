import request from '@/utils/request';

export async function GetMailSendTypeList() {
  return request('/MC/MailSendType/List');
}