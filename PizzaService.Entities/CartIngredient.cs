using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Script.Serialization;

namespace PizzaService.Entities
{
    public class CartIngredient
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("VendorIngredient")]
        public int VendorIngredientId { get; set; }

        public int Count { get; set; }

        [ScriptIgnore]
        public virtual VendorIngredient VendorIngredient { get; set; }
    }
}
