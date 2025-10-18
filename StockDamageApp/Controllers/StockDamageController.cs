using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using StockDamageApp.Data;
using StockDamageApp.Models;

namespace StockDamageApp.Controllers
{
    public class StockDamageController : Controller
    {
        private readonly ApplicationDbContext _context;
        public StockDamageController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index() => View();
        [HttpGet]
        public async Task<IActionResult> GetStockDamageList()
        {
            var list = await _context.StockDamages
                .FromSqlRaw("EXEC dbo.SP_StockDamage_List")
                .ToListAsync();

            return Json(list);
        }

        [HttpGet]
        public async Task<IActionResult> GetInitialData()
        {
            var data = new
            {
                Godowns = await _context.Godowns.ToListAsync(),
                Items = await _context.SubItemCodes.Select(s => new
                {
                    s.SubItemCodeValue,
                    s.SubItemName,
                    s.Unit
                }).ToListAsync(),
                Currencies = await _context.Currencies.ToListAsync(),
                Employees = await _context.Employees.ToListAsync()
            };
            return Json(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetStockBySubItem(string subItemCode)
        {
            var stockQty = await _context.Stocks
                .Where(s => s.SubItemCodeValue == subItemCode)
                .Select(s => s.StockQty)
                .FirstOrDefaultAsync();

            return Json(new { StockQty = stockQty });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveAll([FromBody] List<StockDamageItemViewModel> items)
        {
            if (items == null || items.Count == 0)
                return Json(new { success = false, message = "No data provided." });

            try
            {
                // Calculate AmountIn for each item
                items.ForEach(i =>
                {
                    i.AmountIn = i.Quantity * i.Rate * (i.ConversionRate ?? 1);
                    if (string.IsNullOrEmpty(i.BatchNo))
                        i.BatchNo = "NA";
                    if (string.IsNullOrEmpty(i.DrAChHead))
                        i.DrAChHead = "Stock Damage";
                });

                var jsonData = JsonConvert.SerializeObject(
                    items.Select(i => new
                    {
                        i.GodownNo,
                        i.GodownName,
                        SubItemCode = i.SubItemCodeValue, // maps to SP
                        i.SubItemName,
                        i.Unit,
                        i.BatchNo,
                        i.Quantity,
                        i.Rate,
                        i.AmountIn,
                        i.CurrencyName,
                        i.ConversionRate,
                        i.DrAChHead,
                        i.EmployeeID,
                        i.EmployeeName,
                        i.Comments
                    })
                );

                var param = new Microsoft.Data.SqlClient.SqlParameter("@Items", jsonData);

                await _context.Database.ExecuteSqlRawAsync("EXEC dbo.SP_StockDamage_Save @Items", param);

                return Json(new { success = true, message = "Stock Damage data saved successfully!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

    }
}
