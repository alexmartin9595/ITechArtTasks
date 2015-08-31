using PizzaService.Entities;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace PizzaService.Data
{
    public class CartIngredientsRepository
    {
        private static CartIngredientsRepository instance;

        private CartIngredientsRepository() { }

        public static CartIngredientsRepository Instance
        {
            get
            {
                if (instance == null)
                    instance = new CartIngredientsRepository();
                return instance;
            }
        }

        public IEnumerable<CartViewItem> GetAll()
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.CartIngredients.Select(x => new CartViewItem
                {
                    IngredientName = x.VendorIngredient.Ingredient.Name,
                    Price = x.VendorIngredient.Price,
                    VendorName = x.VendorIngredient.Vendor.Name,
                    Count = x.Count
                }).ToList();
            }
        }

        public int GetSum()
        {
            using (var currentContext = new PizzaSericeContext())
            {
                int sum = 0;

                foreach (var i in currentContext.CartIngredients)
                {
                    sum += i.Count * currentContext.VendorIngredients.Where(x => x.Id == i.VendorIngredientId).FirstOrDefault().Price;
                }

                return sum;
            }
        }

        public void AddCartIngredient(int id)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                if (currentContext.CartIngredients.Where(x => x.VendorIngredientId == id).ToList().Count < 1)
                {
                    currentContext.CartIngredients.Add(new CartIngredient { VendorIngredientId = id, Count = 1 });
                    currentContext.SaveChanges();
                }
                else
                {
                    currentContext.CartIngredients.Where(x => x.VendorIngredientId == id).FirstOrDefault().Count += 1;
                    currentContext.SaveChanges();
                }
            }
        }
    }
}
