using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;
using System.Data.Entity;
using EntityState = System.Data.EntityState;

namespace PizzaService.Data
{
    public class PizzaRepository
    {
        private static PizzaRepository instance;

        private PizzaRepository() {}

        public static PizzaRepository Instance 
        {
            get
            {
                if (instance == null)
                    instance = new PizzaRepository();
                return instance;
            }
        }

        public IEnumerable<Pizza> GetAllPizza()
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.Pizzas.Include("PizzaIngredients").Where(p => p.IsCustom).ToList();
            }
        }

        public Pizza GetPizzaById(int id)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.Pizzas.Include("PizzaIngredients").FirstOrDefault(x => x.Id == id);
            }
        }

        public void AddPrice(int pizzaId, int price)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                Pizza currentPizza = GetPizzaById(pizzaId);
                currentPizza.Price += price;
                currentContext.Entry(currentPizza).State = System.Data.Entity.EntityState.Modified;
                currentContext.SaveChanges();
            }
        }

        public void DecrementPrice(int pizzaId, int price)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                Pizza currentPizza = GetPizzaById(pizzaId);
                currentPizza.Price -= price;
                currentContext.Entry(currentPizza).State = System.Data.Entity.EntityState.Modified;
                currentContext.SaveChanges();
            }
        }

        public void AddPizza(Pizza pizza)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                currentContext.Pizzas.Add(pizza);
                currentContext.SaveChanges();
            }
        }
    }
}
