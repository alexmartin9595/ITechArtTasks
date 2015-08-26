using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class PizzaIngredientRepository
    {
        private PizzaSericeContext context;
        private static PizzaIngredientRepository instance;

        private PizzaIngredientRepository()
        {
            context = new PizzaSericeContext();
        }

        public static PizzaIngredientRepository Instance 
        {
            get
            {
                if (instance == null)
                    instance = new PizzaIngredientRepository();
                return instance;
            }
        }

        public IEnumerable<PizzaIngredient> GetAllPizzaIngredients(int pizzaId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.PizzaIngredients.Where(x => x.PizzaId == pizzaId).ToList();   
            }
        }

        public PizzaIngredient GetPizzaIngredientById(int pizzaId, int ingredientId)
        {
            return context.PizzaIngredients.FirstOrDefault(x => x.PizzaId == pizzaId && x.IngredientId == ingredientId);
        }

        public IEnumerable<PizzaIngredient> GetPizzaIngredients(int pizzaId)
        {
            return context.PizzaIngredients.Where(x => x.PizzaId == pizzaId).ToList();
        }

        public void AddPizzaIngredient(int pizzaId, Ingredient ingredient)
        {
            PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredient.Id);
            if (pizzaIngredient == null)
            {
                context.PizzaIngredients.Add(new PizzaIngredient
                {
                    PizzaId = pizzaId,
                    IngredientId = ingredient.Id,
                    Count = 1
                });
            }
            else
                pizzaIngredient.Count++;
        }

        public void DeleteIngredient(PizzaIngredient pizzaIngredient)
        {
            context.PizzaIngredients.Remove(pizzaIngredient);
        }


    }
}
