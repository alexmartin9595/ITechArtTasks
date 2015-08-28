using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService.Entities
{
    public class Vendor
    {
        [Key]
        public int Id { get; set; }

        public int Quickness { get; set; }

        public string Name { get; set; }

        public virtual ICollection<VendorIngredient> VendorIngredients  { get; set; }

        public virtual ICollection<VendorIngredientToOrder> VendorIngredientsToOrder { get; set; }
    }
}
