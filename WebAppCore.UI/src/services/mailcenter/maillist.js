import request from '@/utils/request';

const MC_Root = process.env.MC_ROOT;

export async function GetMailList() {
  return request(`${MC_Root}/MailList/List`);
};

export async function SaveMailList(params) {
  return request(`${MC_Root}/MailList/Save`, {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
};

export async function DeleteMailList(params) {
  return request(`${MC_Root}/MailList/Delete`, {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}