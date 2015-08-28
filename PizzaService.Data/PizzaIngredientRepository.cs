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
        private static PizzaIngredientRepository instance;

        private PizzaIngredientRepository() {}

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
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.PizzaIngredients.FirstOrDefault(x => x.PizzaId == pizzaId && x.IngredientId == ingredientId);
            }
        }

        

        public IEnumerable<PizzaIngredient> GetPizzaIngredients(int pizzaId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.PizzaIngredients.Include(i => i.Ingredient).Where(x => x.PizzaId == pizzaId).ToList();
            }
        }

        public void IncrementCount(int pizzaId, int ingredientId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredientId);
                pizzaIngredient.Count++;
                currentContext.Entry(pizzaIngredient).State = EntityState.Modified;
                currentContext.SaveChanges();
            }

        }

        public void DecrementCount(int pizzaId, int ingredientId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredientId);
                if (pizzaIngredient.Count == 1)
                {
                    Ingredient ingredient = IngredientRepository.Instance.GetIngredientById(ingredientId);
                    DeleteIngredient(pizzaId, ingredient);
                    return;
                }
                pizzaIngredient.Count--;
                currentContext.Entry(pizzaIngredient).State = EntityState.Modified;
                currentContext.SaveChanges();
            }

        }

        public void AddPizzaIngredient(int pizzaId, Ingredient ingredient)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredient.Id);
                if (pizzaIngredient == null)
                {
                    currentContext.PizzaIngredients.Add(new PizzaIngredient
                    {
                        PizzaId = pizzaId,
                        IngredientId = ingredient.Id,
                        Count = 1
                    });
                }
                else
                    IncrementCount(pizzaId, ingredient.Id);
                PizzaRepository.Instance.AddPrice(pizzaId, ingredient.Price);
                currentContext.SaveChanges();
            }

        }

        public void DeleteIngredient(int pizzaId, Ingredient ingredient)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredient.Id);
                currentContext.PizzaIngredients.Attach(pizzaIngredient);
                currentContext.Entry(pizzaIngredient).State = EntityState.Deleted;
                PizzaRepository.Instance.DecrementPrice(pizzaId, ingredient.Price);
                currentContext.SaveChanges();
            }
        }


    }
}
