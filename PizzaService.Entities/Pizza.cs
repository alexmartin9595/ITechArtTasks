using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace PizzaService.Entities
{
    public class Pizza
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }

        public string Photo { get; set; }

        public int Diameter { get; set; }

        public int Weight { get; set; }

        public bool IsCustom { get; set; }

        public int? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ServiceUser ServiceUser { get; set; }
       
        public virtual ICollection<PizzaIngredient> PizzaIngredients { get; set; }
       
        public virtual ICollection<PizzaToOrder> PizzaToOrder { get; set; }
    }
}
