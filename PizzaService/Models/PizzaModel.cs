using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PizzaService.Entities;

namespace PizzaService.Models
{
    public class PizzaModel
    {
        public int PizzaId { get; set; }

        public Ingredient Ingredient { get; set; }
    }
}