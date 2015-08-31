using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class StockRepository
    {
        private static StockRepository instance;

        public static StockRepository Instance
        {
            get
            {
                if (instance == null)
                    instance = new StockRepository();
                return instance;
            }
        }

        public StockIngredient GetIngredientWithCountById(int id)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.StockIngredients.FirstOrDefault(x => x.IngredientId == id);
            }
        }

        public void UpdateStock(int id, int count)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                StockIngredient currentIngredient = GetIngredientWithCountById(id);
                currentIngredient.Count -= count;
                currentContext.Entry(currentIngredient).State = System.Data.Entity.EntityState.Modified;
                currentContext.SaveChanges();
            }
        }
    }
}
