using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace PizzaService.Entities
{
    public class VendorIngredient
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("Ingredient")]
        public int IngredientId { get; set; }
        
        [ForeignKey("Vendor")]
        public int VendorId { get; set; }

        public int Price { get; set; }

        [ScriptIgnore]
        public virtual Vendor Vendor { get; set; }

        [ScriptIgnore]
        public virtual Ingredient Ingredient { get; set; }

        public virtual ICollection<CartIngredient> CartIngredient { get; set; }

    }
}
