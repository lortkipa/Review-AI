using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DTOs
{
    public class ReviewDTO
    {
        public string Language { get; set; } = null!;
        public uint CodeQuality { get; set; }
        public IEnumerable<IssueDTO> Issues { get; set; } = new List<IssueDTO>();
    }
}
