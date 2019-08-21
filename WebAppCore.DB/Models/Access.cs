using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class Access
    {
        public int Id { get; set; }
        public int? AccessMid { get; set; }
        public int? BaccessMid { get; set; }
        public DateTime? AccessTime { get; set; }
    }
}
