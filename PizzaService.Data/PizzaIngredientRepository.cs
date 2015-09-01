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
                return currentContext.PizzaIngredients.Include("Ingredient").Where(x => x.PizzaId == pizzaId).ToList();   
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

        public void IncrementCount(int userId, int pizzaId, int ingredientId)
        {
            PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredientId);
            Ingredient ingredient = IngredientRepository.Instance.GetIngredientById(ingredientId);
            Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(userId);
            using (var currentContext = new PizzaSericeContext())
            {
                pizzaIngredient.Count++;
                OrderRepository.Instance.AddPrice(currentOrder.Id, ingredient.Price);
                currentContext.Entry(pizzaIngredient).State = EntityState.Modified;
                currentContext.SaveChanges();
            }

        }

        public void DecrementCount(int userId, int pizzaId, int ingredientId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredientId);
                Ingredient ingredient = IngredientRepository.Instance.GetIngredientById(ingredientId);
                Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(userId);

                if (pizzaIngredient.Count == 1)
                {
                    DeleteIngredient(userId, pizzaId, ingredient);
                    OrderRepository.Instance.DecrementPrice(currentOrder.Id, ingredient.Price);
                    return;
                }
                pizzaIngredient.Count--;
                OrderRepository.Instance.DecrementPrice(currentOrder.Id, ingredient.Price);
                currentContext.Entry(pizzaIngredient).State = EntityState.Modified;
                currentContext.SaveChanges();
            }

        }

        public void AddPizzaIngredient(int userId, int pizzaId, Ingredient ingredient)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredient.Id);
                Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(userId);
                if (pizzaIngredient == null)
                {
                    currentContext.PizzaIngredients.Add(new PizzaIngredient
                    {
                        PizzaId = pizzaId,
                        IngredientId = ingredient.Id,
                        Count = 1
                    });
                    OrderRepository.Instance.AddPrice(currentOrder.Id, ingredient.Price);
                }
                else
                    IncrementCount(userId, pizzaId, ingredient.Id);
                PizzaRepository.Instance.AddPrice(pizzaId, ingredient.Price);
                currentContext.SaveChanges();
            }

        }

        public void DeleteIngredient(int userId, int pizzaId, Ingredient ingredient)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaIngredient pizzaIngredient = GetPizzaIngredientById(pizzaId, ingredient.Id);
                Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(userId);
                currentContext.PizzaIngredients.Attach(pizzaIngredient);
                currentContext.Entry(pizzaIngredient).State = EntityState.Deleted;
                PizzaRepository.Instance.DecrementPrice(pizzaId, ingredient.Price);
                OrderRepository.Instance.DecrementPrice(currentOrder.Id, ingredient.Price);
                currentContext.SaveChanges();
            }
        }


    }
}
