using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService.Entities
{
    public class PizzaToOrder
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Pizza")]
        public int PizzaId { get; set; }

        [ForeignKey("Order")]
        public int OrderId { get; set; }

        public int Count { get; set; }
        
        public virtual Pizza Pizza { get; set; }
        
        public virtual Order Order { get; set; }
    }
}
