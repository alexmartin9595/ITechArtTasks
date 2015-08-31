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

        public IEnumerable<ServiceUser> GetAllUsers ()
        {
            using (var contex = new PizzaSericeContext())
            {
                return contex.ServiceUsers.Include("Role").ToList();
            }
        }

        public IEnumerable<Role> GetAllRoles ()
        {
            using (var context = new PizzaSericeContext())
            {
                return context.Roles.Include("ServiceUsers").ToList();
            }
        }

        public Role GetRoleById (int roleId)
        {
            using (var context = new PizzaSericeContext())
            {
                return context.Roles.Where(r => r.Id == roleId).FirstOrDefault();
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

        public void AddRole (Role role)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                currentContext.Roles.Add(role);
                currentContext.SaveChanges();
            }
        }

        public void EditUserRole (int userId, Role role)
        {
            using (var context = new PizzaSericeContext())
            {
                ServiceUser user = GetUserById(userId);
                user.RoleId = role.Id;
                context.ServiceUsers.Attach(user);
                context.Entry(user).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }            
        }

        public void DeleteRole(int  roleId)
        {
            using (var context = new PizzaSericeContext())
            {
                Role role = GetRoleById(roleId);
                context.Roles.Attach(role);
                context.Entry(role).State = System.Data.Entity.EntityState.Deleted;
                context.SaveChanges();
            }
            
        }
    }
}
