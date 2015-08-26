using System;
using System.Collections.Generic;
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
                    pizzaToOrder.Count++;
                currentContext.SaveChanges();
            }
            

        }
    }
}
