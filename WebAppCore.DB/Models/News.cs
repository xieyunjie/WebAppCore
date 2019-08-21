using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string NewContent { get; set; }
        public string KeyWord { get; set; }
        public DateTime? AddTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public int? UserId { get; set; }
        public int? Type { get; set; }
        public int? Status { get; set; }
        public int? ReadTimes { get; set; }
        public int? RoleStatus { get; set; }
        public int? TopStatus { get; set; }
    }
}
