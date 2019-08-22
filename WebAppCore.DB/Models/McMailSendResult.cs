using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class McMailSendResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Subject { get; set; }
        public string MailBody { get; set; }
        public bool? IsHtml { get; set; }
        public string Address { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public string DestinationMail { get; set; }
        public string CcdestinationMail { get; set; }
        public string BccdestinationMail { get; set; }
        public DateTime SendTime { get; set; }
        public int Status { get; set; }
    }
}
