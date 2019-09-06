import { MailSendTypeType } from '../mailsendtype/data';
import { MailSendEndType } from '../mailsendend/data';


export interface MailListType{
    Id: number;
    Name: string;
    DisplayName: string;
    Subject: string;
    MailBody: string;
    IsHtml: boolean;
    MailSendTypeId: number;
    MailSendEndId: number;
    Status: number;
    MailSendEnd?: MailSendEndType | null;
    MailSendType?: MailSendEndType | null;
    McMailReceiveEnd?: []
}
