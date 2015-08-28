using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class PizzaToOrderRepository
    {
       
        private static PizzaToOrderRepository instance;

        private PizzaToOrderRepository() { }

        public static PizzaToOrderRepository Instance 
        {
            get
            {
                if (instance == null)
                    instance = new PizzaToOrderRepository();
                return instance;
            }
        }

        public IEnumerable<PizzaToOrder> GetPizzaToOrderByOrderId(int orderId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.PizzaToOrders.Where(p => p.OrderId == orderId).ToList();
            }
        }

        public PizzaToOrder GetPizzaToOrderById(int orderId, int pizzaId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.PizzaToOrders.FirstOrDefault(p => p.OrderId == orderId && p.PizzaId == pizzaId);
            }
        }

        public PizzaToOrder GetCurrentUserPizza(int orderId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                IEnumerable<PizzaToOrder> pizzaToOrders =
                    currentContext.PizzaToOrders.ToList();
                return pizzaToOrders.Last();
            }
        }

        public int GetPizzaCountByOrderId(int orderId, int pizzaId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                var firstOrDefault = currentContext.PizzaToOrders.FirstOrDefault(p => p.PizzaId == pizzaId && p.OrderId == orderId);
                if (firstOrDefault != null)
                    return firstOrDefault.Count;
                else return -1;
            }
        }

        public void IncrementCount(int orderId, int pizzaId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaToOrder pizzaToOrder = GetPizzaToOrderById(orderId, pizzaId);
                pizzaToOrder.Count++;
                currentContext.Entry(pizzaToOrder).State = EntityState.Modified;
                currentContext.SaveChanges();
            }

        }

        public void DecrementCount(int orderId, int pizzaId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaToOrder pizzaToOrder = GetPizzaToOrderById(orderId, pizzaId);
                pizzaToOrder.Count--;
                currentContext.Entry(pizzaToOrder).State = EntityState.Modified;
                currentContext.SaveChanges();
            }

        }

        public void CreatePizza(int userId)
        {
            Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(userId);
            if (currentOrder == null)
            {
                currentOrder = new Order { UserId = userId, Price = 0, IsConfirmed = false };
                OrderRepository.Instance.AddOrder(currentOrder);
            }
            Pizza currentPizza = new Pizza { Diameter = 25, IsCustom = false, Name = "User Pizza", Price = 0, Weight = 0 };
            PizzaRepository.Instance.AddPizza(currentPizza);
            AddPizzaToOrder(currentOrder.Id, currentPizza);
        }

        public void AddPizzaToOrder(int orderId, Pizza pizza)
        {
            PizzaToOrder pizzaToOrder = GetPizzaToOrderById(orderId, pizza.Id);
            using (var currentContext = new PizzaSericeContext())
            {
                if (pizzaToOrder == null)
                {
                    currentContext.PizzaToOrders.Add(new PizzaToOrder
                    {
                        OrderId = orderId,
                        PizzaId = pizza.Id,
                        Count = 1
                    });
                }
                else
                    IncrementCount(orderId, pizza.Id);
                currentContext.SaveChanges();
            }
        }

        public void DeleteOrderPizza (int orderId, Pizza pizza)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                PizzaToOrder pizzaToOrder = GetPizzaToOrderById(orderId, pizza.Id);
                if (pizzaToOrder.Count == 1)
                {
                    currentContext.PizzaToOrders.Attach(pizzaToOrder);
                    currentContext.Entry(pizzaToOrder).State = EntityState.Deleted;
                }
                else
                    DecrementCount(orderId, pizza.Id);
                OrderRepository.Instance.DecrementPrice(orderId, pizza.Price);
                currentContext.SaveChanges();
            }
        }
    }
}
