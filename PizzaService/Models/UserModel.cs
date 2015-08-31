using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PizzaService.Entities;

namespace PizzaService.Models
{
    public class UserModel
    {
        public Role Role { get; set; }

        public ServiceUser User { get; set; }
    }
}