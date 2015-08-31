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
                return currentContext.Ingredients.Include("StockIngredient").ToList();    
            }            
        }

        public Ingredient GetIngredientById(int id)
        {
            using (var currentcontext = new PizzaSericeContext())
            {
                return currentcontext.Ingredients.FirstOrDefault(x => x.Id == id);    
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

        public IEnumerable<Ingredient> GetIngredientsNameByIds(int[] ids)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                List<Ingredient> ingredients = new List<Ingredient>();

                for (var i = 0; i < ids.Length; i++)
                {
                    var id = ids[i];
                    ingredients.Add(currentContext.Ingredients.FirstOrDefault(p => p.Id == id));
                }
                return ingredients;
            }

        }
    }
}
