using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class Fight
    {
        public int Id { get; set; }
        public int? Type { get; set; }
        public string Remark { get; set; }
        public int? MemberA { get; set; }
        public int? MemberB { get; set; }
        public int? Result { get; set; }
        public DateTime? AddTime { get; set; }
        public int? Status { get; set; }
    }
}
