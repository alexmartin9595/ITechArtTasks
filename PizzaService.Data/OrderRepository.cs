using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;
using EntityState = System.Data.Entity.EntityState;

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
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.Orders.Where(x => x.UserId == userId).ToList();    
            }
        }
        
        public Order GetOrderById(int orderId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.Orders.FirstOrDefault(x => x.Id == orderId);
            }
        }

        
        public Order GetUnConfirmedOrder(int userId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.Orders.FirstOrDefault(o => o.IsConfirmed == false && o.UserId == userId);
            }
        }

        public void AddOrder(Order order)
        {
            using (var currentContex = new PizzaSericeContext())
            {
                currentContex.Orders.Add(order);
                currentContex.SaveChanges();
            }
        }

        public void AddPrice(int orderId, int price)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                Order currentOrder = GetOrderById(orderId);
                currentOrder.Price += price;
                currentContext.Entry(currentOrder).State = EntityState.Modified;
                currentContext.SaveChanges();
            }
        }

        public void DecrementPrice(int orderId, int price)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                Order currentOrder = GetOrderById(orderId);
                currentOrder.Price -= price;
                currentContext.Entry(currentOrder).State = EntityState.Modified;
                currentContext.SaveChanges();
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
                AddPrice(currentOrder.Id, pizza.Price);
                currentContext.SaveChanges();
            }
            
        }

        public void ConfirmOrder(int userId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                Order order = GetUnConfirmedOrder(userId);
                order.IsConfirmed = true;
                currentContext.Entry(order).State = EntityState.Modified;
                currentContext.SaveChanges();
            }
        }

        public void DeleteOrder(Order order)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                currentContext.Orders.Attach(order);
                currentContext.Entry(order).State = EntityState.Deleted;
                currentContext.SaveChanges();
            }
        }
    }
}
