using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class IngredientRepository
    {
        private PizzaSericeContext context;

        public IngredientRepository()
        {
            context = new PizzaSericeContext();
        }
        public IEnumerable<Ingredient> GetAllIngredients()
        {
            return context.Ingredients;
        }

        public Ingredient GetIngredientById(int id)
        {
            return context.Ingredients.FirstOrDefault(x => x.Id == id);
        }

        public void AddIngredient(Ingredient ingredient)
        {
            context.Ingredients.Add(ingredient);
            context.SaveChanges();
         
        }
    }
}
