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
    public class History
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Pizza")]
        public int PizzaId { get; set; }

        [ForeignKey("Shift")]
        public int ShiftId { get; set; }

        public bool IsCompleted { get; set; }

        public bool IsDeleted { get; set; }

        [ScriptIgnore]
        public virtual Pizza Pizza { get; set; }

        [ScriptIgnore]
        public virtual Shift Shift { get; set; }
    }
}
