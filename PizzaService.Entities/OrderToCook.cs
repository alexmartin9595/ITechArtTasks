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
    public class OrderToCook
    {
        [Key, Column(Order = 0)]
        [ForeignKey("Shift")]
        public int ShiftId { get; set; }

        [Key, Column(Order = 1)]
        [ForeignKey("Order")]
        public int OrderId { get; set; }

        public bool IsCompleted { get; set; }

        public bool IsDeleted { get; set; }

        [ScriptIgnore]
        public virtual Order Order { get; set; }

        [ScriptIgnore]
        public virtual Shift Shift { get; set; }


    }
}
