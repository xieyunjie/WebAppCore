using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class AttachMent
    {
        public int Id { get; set; }
        public int? MemberId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int? Type { get; set; }
        public string Remark { get; set; }
        public DateTime? AddTime { get; set; }
        public int? Status { get; set; }
        public int? TopStatus { get; set; }
        public int? RoleStatus { get; set; }
    }
}
