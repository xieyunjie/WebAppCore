using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class SystemScoreList
    {
        public int Id { get; set; }
        public int? MemberId { get; set; }
        public int? ActionId { get; set; }
        public int? SystemScoreOld { get; set; }
        public int? SystemScoreNew { get; set; }
        public int? AddScore { get; set; }
        public int? Status { get; set; }
        public DateTime? AddTime { get; set; }
    }
}
