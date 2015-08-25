using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace PizzaService.Entities
{
    public class PizzaToOrder
    {
        [Key, Column(Order = 0)]
        [ForeignKey("Pizza")]
        public int PizzaId { get; set; }

        [Key, Column(Order = 1)]
        [ForeignKey("Order")]
        public int OrderId { get; set; }

        public int Count { get; set; }

        [ScriptIgnore]
        public virtual Pizza Pizza { get; set; }

        [ScriptIgnore]
        public virtual Order Order { get; set; }
    }
}
