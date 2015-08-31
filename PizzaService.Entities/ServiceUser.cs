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
    public class ServiceUser
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }

        [ScriptIgnore]
        public Role Role { get; set; }
        
        public virtual ICollection<Order> Orders { get; set; }
    }
}
