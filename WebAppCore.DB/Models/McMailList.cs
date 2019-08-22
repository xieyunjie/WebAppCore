using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class McMailList
    {
        public McMailList()
        {
            McMailReceiveEnd = new HashSet<McMailReceiveEnd>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Subject { get; set; }
        public string MailBody { get; set; }
        public bool? IsHtml { get; set; }
        public int MailSendTypeId { get; set; }
        public int MailSendEndId { get; set; }
        public int Status { get; set; }

        public virtual McMailSendEnd MailSendEnd { get; set; }
        public virtual McMailSendType MailSendType { get; set; }
        public virtual ICollection<McMailReceiveEnd> McMailReceiveEnd { get; set; }
    }
}
