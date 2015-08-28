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
    public class VendorIngredientToOrder
    {
        [Key, Column(Order = 0)]
        [ForeignKey("Ingredient")]
        public int IngredientId { get; set; }

        [Key, Column(Order = 1)]
        [ForeignKey("Vendor")]
        public int VendorId { get; set; }

        [Key, Column(Order = 2)]
        [ForeignKey("VendorOrder")]
        public int VendorOrderId { get; set; }

        [ScriptIgnore]
        public virtual VendorOrder VendorOrder { get; set; }

        [ScriptIgnore]
        public virtual Vendor Vendor { get; set; }

        [ScriptIgnore]
        public virtual Ingredient Ingredient { get; set; }
    }
}
