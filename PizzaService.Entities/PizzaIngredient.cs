using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService.Entities
{
    public class PizzaIngredient
    {
        
        [ForeignKey("Pizza")]
        public int PizzaId { get; set; }

        [ForeignKey("Ingredient")]
        public int IngredientId { get; set; }

        public int Count { get; set; }
        
        public virtual Ingredient Ingredient { get; set; }
        
        public virtual Pizza Pizza { get; set; }
    }
}
