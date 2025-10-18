using System.ComponentModel.DataAnnotations;

namespace StockDamageApp.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
    }
}
