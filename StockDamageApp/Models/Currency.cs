using System.ComponentModel.DataAnnotations;

namespace StockDamageApp.Models
{
    public class Currency
    {
        [Key]
        public int Id { get; set; }
        public string CurrencyName { get; set; } = string.Empty;
        public decimal ConversionRate { get; set; }
    }
}
