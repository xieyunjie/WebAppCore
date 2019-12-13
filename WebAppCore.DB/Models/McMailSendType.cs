using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class McMailSendType
    {
        public McMailSendType()
        {
            McMailList = new HashSet<McMailList>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual ICollection<McMailList> McMailList { get; set; }
    }
}
