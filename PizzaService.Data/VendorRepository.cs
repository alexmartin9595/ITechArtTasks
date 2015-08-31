using PizzaService.Entities;
using System.Collections.Generic;
using System.Linq;

namespace PizzaService.Data
{
    public class VendorRepository
    {
        private static VendorRepository instance;

        private VendorRepository() { }

        public static VendorRepository Instance
        {
            get
            {
                if (instance == null)
                    instance = new VendorRepository();
                return instance;
            }
        }

        public IEnumerable<Vendor> GetAllVendors()
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.Vendors.ToList();
            }
        }

        public IEnumerable<VendorIngredient> GetVendorByProductId(int id)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                List<VendorIngredient> vendorIngredients = currentContext.VendorIngredients.Include("Vendor").Where(x => x.IngredientId == id).ToList();

                return vendorIngredients;     
            }
        }

        public void DeleteVendor(int id)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                Vendor vendor = currentContext.Vendors.Find(id);
                currentContext.Vendors.Remove(vendor);
                currentContext.SaveChanges();
            }
        }

        public void AddVendor(Vendor vendor)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                currentContext.Vendors.Add(vendor);
                currentContext.SaveChanges();
            }
        }
    }
}
