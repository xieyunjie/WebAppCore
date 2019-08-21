using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class Member
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? Birth { get; set; }
        public string Tel { get; set; }
        public int? Sex { get; set; }
        public string Ycaccount { get; set; }
        public string Login { get; set; }
        public string Address { get; set; }
        public string Remark { get; set; }
        public int? ChessLevel { get; set; }
        public int? SystemScore { get; set; }
        public int? ChessScore { get; set; }
        public int? Status { get; set; }
    }
}
