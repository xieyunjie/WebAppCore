import request from '@/utils/request';

export async function GetMailList() {
  return request('/MC/MailList/List');
};

export async function SaveMailList(params) {
  return request('/MC/MailList/Save', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
};

export async function DeleteMailList(params) {
  return request('/MC/MailList/Delete', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}