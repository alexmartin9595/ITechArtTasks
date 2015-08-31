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
                return currentContext.PizzaToOrders.Include("Pizza").Where(p => p.OrderId == orderId).ToList();
            }
        }

        public PizzaToOrder GetPizzaToOrderById(int orderId, int pizzaId)
        {
            using (var currentContext = new PizzaSericeContext())
            {
                return currentContext.PizzaToOrders.FirstOrDefault(p => p.OrderId == orderId && p.PizzaId == pizzaId);
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

        public IEnumerable<Pizza> GetPizzasToCook()
        {
            using (var currentContext = new PizzaSericeContext())
            {
                var orders = currentContext.Orders.Include(i => i.PizzaToOrder).Where(p => p.IsComplited == false).Select(
                    p => new
                    {
                        OrderId = p.Id,
                        PizzaToOrder = p.PizzaToOrder,
                        IsCompleted = p.IsComplited
                    });
                List<Pizza> pizza = new List<Pizza>();
                foreach (var order in orders)
                {
                    var pizzaToOrder =
                        currentContext.PizzaToOrders.Where(i => i.OrderId == order.OrderId).Select(p => new
                        {
                            PizzaId = p.PizzaId,
                            Count = p.Count
                        });
                    foreach (var pizzaInOrder in pizzaToOrder)
                    {
                        Pizza currentPizza = currentContext.Pizzas.Include(p => p.PizzaIngredients).FirstOrDefault(p => p.Id == pizzaInOrder.PizzaId);
                        for (var i = 0; i < pizzaInOrder.Count; i++)
                        {
                            pizza.Add(currentPizza);
                        }
                    }
                }
                return pizza;
            }
        }
    }
}
