using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DTOs
{
    public class IssueDTO
    {
        public string Severity { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public IEnumerable<uint> Lines { get; set; } = new List<uint>();
        public string Explanation { get; set; } = null!;
    }
}
