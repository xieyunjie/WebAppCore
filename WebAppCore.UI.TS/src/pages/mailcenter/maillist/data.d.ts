import { MailSendTypeType } from '@/pages/mailcenter/mailsendtype/data';
import { MailSendEndType } from "@/pages/mailcenter/mailsendend/data";


export interface MailListType{
    Id: number;
    Name: string;
    DisplayName: string;
    Subject: string;
    MailBody: string;
    IsHtml: boolean;
    MailSendTypeId: number;
    MailSendEndId: number;
    Status: boolean;
    MailSendEnd?: MailSendEndType
    MailSendType?: MailSendEndType,
    McMailReceiveEnd?: []
}
