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
        private static IngredientRepository instance;

        private IngredientRepository() {}

        public static IngredientRepository Instance 
        {
            get
            {
                if (instance == null)
                    instance = new IngredientRepository();
                return instance;
            }
        }

        public IEnumerable<Ingredient> GetAllIngredients()
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.Ingredients.ToList();    
            }            
        }

        public Ingredient GetIngredientById(int id)
        {
            using (var currentcontext = new PizzaSericeContext())
            {
                return currentcontext.Ingredients.FirstOrDefault(x => x.Id == id);    
            }
        }

        public IEnumerable<Ingredient> GetIngredientsByPizzaId(int pizzaId)
        {
            using (var currentcontext = new PizzaSericeContext())
            {
                IEnumerable<PizzaIngredient> pizzaIngredients =
                    PizzaIngredientRepository.Instance.GetPizzaIngredients(pizzaId);
                List<Ingredient> ingredients = new List<Ingredient>();
                foreach (var pizzaIngredient in pizzaIngredients)
                {
                    Ingredient ingredient = currentcontext.Ingredients.FirstOrDefault(i => i.Id == pizzaIngredient.IngredientId);
                    ingredients.Add(ingredient);
                }
                return ingredients;
            }
        }

        public void AddIngredient(Ingredient ingredient)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                currentContext.Ingredients.Add(ingredient);
                currentContext.SaveChanges();
            }

        }
    }
}
