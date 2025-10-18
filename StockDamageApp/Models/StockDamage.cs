using System.ComponentModel.DataAnnotations;

namespace StockDamageApp.Models
{
    public class StockDamage
    {
        [Key]
        public int Id { get; set; }
        public DateTime DamageDate { get; set; } = DateTime.Now;
        public int? GodownNo { get; set; }
        public string? GodownName { get; set; }
        public string SubItemCodeValue { get; set; } = string.Empty;
        public string? SubItemName { get; set; }
        public string? Unit { get; set; }
        public string BatchNo { get; set; } = "NA";
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal AmountIn { get; set; }
        public string? CurrencyName { get; set; }
        public decimal? ConversionRate { get; set; }
        public string DrAChHead { get; set; } = "Stock Damage";
        public int? EmployeeID { get; set; }
        public string? EmployeeName { get; set; }
        public string? Comments { get; set; }
    }
}
