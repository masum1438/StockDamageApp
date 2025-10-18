using System.ComponentModel.DataAnnotations;

namespace StockDamageApp.Models
{
    public class Stock
    {
        [Key]
        public int Id { get; set; }
        public string SubItemCodeValue { get; set; } = string.Empty;
        public decimal StockQty { get; set; }
    }
}
