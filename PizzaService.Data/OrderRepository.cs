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

        public Order GetUnConfirmedOrder(int userId)
        {
            return context.Orders.FirstOrDefault(o => o.IsConfirmed == false);
        }

        public void AddOrder(Order order)
        {
            using (var currentContex = new PizzaSericeContext())
            {
                currentContex.Orders.Add(order);
                currentContex.SaveChanges();
            }
        }

        public void AddPizzaToOrder(int userId, Pizza pizza)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                Order currentOrder = GetUnConfirmedOrder(userId);
                if (currentOrder == null)
                {
                    currentOrder = new Order { UserId = userId, Price = 0, IsConfirmed = false };
                    AddOrder(currentOrder);
                }

                PizzaToOrderRepository.Instance.AddPizzaToOrder(currentOrder.Id, pizza);
                currentOrder.Price += pizza.Price;
                currentContext.SaveChanges();
            }
            
        }

        public void Delete(Order order)
        {
            context.Orders.Remove(order);
            context.SaveChanges();
        }
    }
}
