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
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public int Price { get; set; }

        public int UserId { get; set; }

        public bool IsConfirmed { get; set; }

        public bool IsComplited { get; set; }

        [ForeignKey("UserId")]
        public virtual ServiceUser ServiceUser { get; set; }
        
        public virtual ICollection<PizzaToOrder> PizzaToOrder { get; set; }
        
    }
}
