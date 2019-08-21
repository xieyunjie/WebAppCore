using System;
using System.Collections.Generic;

namespace WebAppCore.DB.Models
{
    public partial class Action
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? SystemScore { get; set; }
        public string Remark { get; set; }
    }
}
