using System.ComponentModel.DataAnnotations;

namespace StockDamageApp.Models
{
    public class Godown
    {
        [Key]
        public int AutoSlNo { get; set; }
        public int GodownNo { get; set; }
        public string GodownName { get; set; } = string.Empty;
    }
}
