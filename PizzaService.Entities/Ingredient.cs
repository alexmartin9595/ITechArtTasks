using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService.Entities
{
    public class Ingredient
    {
        [Key]
        public int Id { get; set; }

        public int Price { get; set; }

        public string Name { get; set; }

        public int Weight { get; set; }

        public string Photo { get; set; }
    }
}
