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
        public PizzaSericeContext() : base("DefaultConnection") { }

        public DbSet<Pizza> Pizzas { get; set; }

        public DbSet<Ingredient> Ingredients { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<PizzaIngredient> PizzaIngredients { get; set; }

        public DbSet<ServiceUser> ServiceUsers { get; set; }
    }
}
