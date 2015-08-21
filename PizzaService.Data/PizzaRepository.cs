using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class PizzaRepository
    {
        public IEnumerable<Pizza> GetAllPizza()
        {
            using (var context = new PizzaSericeContext())
            {
                return context.Pizzas;
            }
        }

        public void AddPizza(Pizza pizza)
        {
            using (var context = new PizzaSericeContext())
            {
                context.Pizzas.Add(pizza);
                context.SaveChanges();
            }
        }
    }
}
