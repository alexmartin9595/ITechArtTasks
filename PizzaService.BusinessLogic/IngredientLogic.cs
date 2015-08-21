using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Data;
using PizzaService.Entities;

namespace PizzaService.BusinessLogic
{
    public class IngredientLogic
    {
        private static IngredientLogic instance;
        private IngredientRepository ingredientRepository;

        private IngredientLogic()
        {
            ingredientRepository = new IngredientRepository();
        }

        public static IngredientLogic GetInstance()
        {
            if (instance == null)
                instance = new IngredientLogic();
           
            return instance;
        }
      
        public IEnumerable<Ingredient> GetAllIngredients()
        {
            return ingredientRepository.GetAllIngredients();
        }

        public Ingredient GetIngredientById(int id)
        {
            return ingredientRepository.GetIngredientById(id);
        }

        public void AddIngredient(Ingredient ingredient)
        {
            ingredientRepository.AddIngredient(ingredient);
        }

       
    }
}
