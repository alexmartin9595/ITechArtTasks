using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class PizzaSericeContext : DbContext
    {
        public PizzaSericeContext() : base("DefaultConnection")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PizzaIngredient>().HasKey(t => new { t.IngredientId, t.PizzaId });

            modelBuilder.Entity<PizzaToOrder>().HasKey(t => new { t.OrderId, t.PizzaId });

            modelBuilder.Entity<Pizza>()
                        .HasMany(s => s.PizzaIngredients)
                        .WithRequired(s => s.Pizza)
                        .HasForeignKey(s => s.PizzaId);

            modelBuilder.Entity<Ingredient>()
                .HasMany(s => s.PizzaIngredients)
                .WithRequired(s => s.Ingredient)
                .HasForeignKey(s => s.IngredientId);
        }
        
        
        public DbSet<Pizza> Pizzas { get; set; }

        public DbSet<Ingredient> Ingredients { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<PizzaIngredient> PizzaIngredients { get; set; }

        public DbSet<PizzaToOrder> PizzaToOrders { get; set; }

        public DbSet<ServiceUser> ServiceUsers { get; set; }

        public DbSet<OrderToCook> OrdersToCook { get; set; }

        public DbSet<Shift> Shifts { get; set; }

        public DbSet<StockIngredient> StockIngredients { get; set; }

        public DbSet<Vendor> Vendors { get; set; }

        public DbSet<VendorIngredient> VendorIngredients { get; set; }

        public DbSet<VendorIngredientToOrder> VendorIngredientToOrders { get; set; }

        public DbSet<VendorOrder> VendorOrders { get; set; }
    }
}
