using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

using PizzaService.Entities;

namespace PizzaService.Data
{
    public class CustomRoleProvider : RoleProvider
    {
        public override string[] GetRolesForUser(string name)
        {
            string[] role = new string[] { };
            using (var currentContext = new PizzaSericeContext())
            {
                try
                {
                    // Получаем пользователя
                    ServiceUser user = currentContext.ServiceUsers.Where(u => u.Name == name).FirstOrDefault();
                    if (user != null)
                    {
                        // получаем роль
                        Role userRole = currentContext.Roles.Find(user.RoleId);
                        if (userRole != null)
                        {
                            role = new string[] { userRole.Name };
                        }
                    }
                }
                catch
                {
                    role = new string[] { };
                }
            }
            return role;
        }
        public override void CreateRole(string roleName)
        {
            using (PizzaSericeContext currentContext = new PizzaSericeContext())
            {
                Role newRole = new Role() { Name = roleName };
                currentContext.Roles.Add(newRole);
                currentContext.SaveChanges();
            }
        }
        public override bool IsUserInRole(string username, string roleName)
        {
            bool outputResult = false;
            // Находим пользователя
            using (var currentContext = new PizzaSericeContext())
            {
                try
                {
                    // Получаем пользователя
                    ServiceUser user = currentContext.ServiceUsers.Where(u => u.Name == username).FirstOrDefault();
                    if (user != null)
                    {
                        // получаем роль
                        Role userRole = currentContext.Roles.Find(user.RoleId);
                        //сравниваем
                        if (userRole != null && userRole.Name == roleName)
                        {
                            outputResult = true;
                        }
                    }
                }
                catch
                {
                    outputResult = false;
                }
            }
            return outputResult;
        }
        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get { throw new NotImplementedException(); }
            set { throw new NotImplementedException(); }
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}
