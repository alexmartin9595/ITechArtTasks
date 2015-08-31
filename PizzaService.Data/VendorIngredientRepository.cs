using PizzaService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService.Data
{
    public class VendorIngredientRepository
    {
        private static VendorIngredientRepository instance;

        private VendorIngredientRepository() { }

        public static VendorIngredientRepository Instance
        {
            get
            {
                if (instance == null)
                    instance = new VendorIngredientRepository();
                return instance;
            }
        }

        public VendorIngredient GetVendorIngredientById(int id)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.VendorIngredients.Where(x => x.Id == id).FirstOrDefault();
            }
        }
    }
}
