using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService.Entities
{
    public class CartViewItem
    {
        public string IngredientName { get; set; }

        public string VendorName { get; set; }

        public int Price { get; set; }

        public int Count { get; set; }
    }
}
