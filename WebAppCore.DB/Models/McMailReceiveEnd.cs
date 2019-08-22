using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class McMailReceiveEnd
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MailId { get; set; }
        public string Address { get; set; }
        public int? SendType { get; set; }
        public int Status { get; set; }

        public virtual McMailList Mail { get; set; }
    }
}
