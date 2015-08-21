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
        [Key]
        public int Id { get; set; }

        public int PizzaId { get; set; }

        public int IngredientId { get; set; }

        public int Count { get; set; }

        [ForeignKey("IngredientId")]
        public virtual Ingredient Ingredient { get; set; }

        [ForeignKey("PizzaId")]
        public virtual Pizza Pizza { get; set; }
    }
}
