using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class McMailSendEnd
    {
        public McMailSendEnd()
        {
            McMailList = new HashSet<McMailList>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public int Status { get; set; }

        public virtual ICollection<McMailList> McMailList { get; set; }
    }
}
