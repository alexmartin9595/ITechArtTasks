using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace PizzaService.Entities
{
    public class ServiceUser
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        
        public virtual ICollection<Pizza> Pizza { get; set; }
        
        public virtual ICollection<Order> Orders { get; set; }
    }
}
