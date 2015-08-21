using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class OrderRepository
    {
        private PizzaSericeContext context;
        private static OrderRepository instance;

        private OrderRepository()
        {
            context = new PizzaSericeContext();
        }

        public static OrderRepository Instance 
        {
            get
            {
                if (instance == null)
                    instance = new OrderRepository();
                return instance;
            }
        }

        public IEnumerable<Order> GetAllUserOrders(int userId)
        {
            return context.Orders.Where(x => x.UserId == userId);
        }

        public Order GetUserOrderById(int userId, int orderId)
        {
            return context.Orders.Where(x => x.UserId == userId).FirstOrDefault(x => x.Id == orderId);
        }

        public void AddOrder(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
        }

        public void Delete(Order order)
        {
            context.Orders.Remove(order);
            context.SaveChanges();
        }
    }
}
