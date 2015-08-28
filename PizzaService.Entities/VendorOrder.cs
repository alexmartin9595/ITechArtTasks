using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService.Entities
{
    public class VendorOrder
    {
        [Key]
        public int Id { get; set; }

        public int Count { get; set; }

        public int VendorIngredientId { get; set; }

        public virtual ICollection<VendorIngredientToOrder> VendorIngredientToOrder { get; set; }
    }
}
