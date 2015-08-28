﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService.Entities
{
    public class Shift
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<OrderToCook> OrdersToCook { get; set; }
    }
}
