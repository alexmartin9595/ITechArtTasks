using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class ServiceUserRepository
    {
        private static ServiceUserRepository instance;

        private ServiceUserRepository() { }

        public static ServiceUserRepository Instance 
        {
            get
            {
                if (instance == null)
                    instance = new ServiceUserRepository();
                return instance;
            }
        }

        public ServiceUser GetUserByName(string name)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                var user = currentContext.ServiceUsers.FirstOrDefault(x => x.Name == name);
                return user;
            }
        }

        public ServiceUser GetUserById(int id)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.ServiceUsers.FirstOrDefault(x => x.Id == id);
            }
        }
        public void AddUser(ServiceUser user)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                currentContext.ServiceUsers.Add(user);
                currentContext.SaveChanges();
            }
        }
    }
}
