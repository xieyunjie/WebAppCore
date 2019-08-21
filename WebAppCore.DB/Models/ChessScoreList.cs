using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class ChessScoreList
    {
        public int Id { get; set; }
        public int? FightId { get; set; }
        public int? MemberId { get; set; }
        public int? ChessScoreOld { get; set; }
        public int? ChessScoreNew { get; set; }
        public int? AddScore { get; set; }
        public DateTime? AddTime { get; set; }
    }
}
