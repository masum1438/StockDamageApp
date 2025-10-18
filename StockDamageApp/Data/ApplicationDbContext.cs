using Microsoft.EntityFrameworkCore;
using StockDamageApp.Models;
using System.Collections.Generic;

namespace StockDamageApp.Data
{
    //public class ApplicationDbContext : DbContext
    //{
    //    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    //    public DbSet<Godown> Godowns { get; set; }
    //    public DbSet<SubItemCode> SubItemCodes { get; set; }
    //    public DbSet<Stock> Stocks { get; set; }
    //    public DbSet<Currency> Currencies { get; set; }
    //    public DbSet<Employee> Employees { get; set; }
    //    public DbSet<StockDamage> StockDamages { get; set; }
    //}
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Godown> Godowns { get; set; }
        public DbSet<SubItemCode> SubItemCodes { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<StockDamage> StockDamages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Godown>().ToTable("Godown");
            modelBuilder.Entity<SubItemCode>().ToTable("SubItemCode");
            modelBuilder.Entity<Stock>().ToTable("Stock");
            modelBuilder.Entity<Currency>().ToTable("Currency");
            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<StockDamage>().ToTable("StockDamage");
        }
    }

}
