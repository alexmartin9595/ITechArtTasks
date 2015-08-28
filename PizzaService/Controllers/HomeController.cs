using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Security;
using PizzaService.Data;
using PizzaService.Entities;
using PizzaService.Models;

namespace PizzaService.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //IngredientLogic.GetInstance().AddIngredient(new Ingredient { Name = "tomato", Photo = "../images/ingredients/tomato-sauce.jpg", Price = 9000, Weight = 100});
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public ActionResult GetAllIngredients()
        {
            IEnumerable<Ingredient> ingredients = IngredientRepository.Instance.GetAllIngredients();
            return Json(ingredients, JsonRequestBehavior.AllowGet) ;
        }

        [HttpGet]
        public ActionResult GetIngredientById(int id)
        {
            Ingredient ingredient = IngredientRepository.Instance.GetIngredientById(id);
            return Json(ingredient, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllPizza()
        {
            IEnumerable<Pizza> pizza = PizzaRepository.Instance.GetAllPizza();
            return Json(pizza, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPizzaById(int id)
        {
            Pizza pizza = PizzaRepository.Instance.GetPizzaById(id);
            return Json(pizza, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPizzaIngredients(int id)
        {
            IEnumerable<PizzaIngredient> pizzaIngredients = PizzaIngredientRepository.Instance.GetPizzaIngredients(id);
            return Json(pizzaIngredients.Select(p => new {Count = p.Count, Ingredient = p.Ingredient}), JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        [HttpPost]
        public ActionResult AddPizzaToOrder(Pizza pizza)
        {
            string currrentUserName = User.Identity.Name;
            int currentUserId = ServiceUserRepository.Instance.GetUserByName(currrentUserName).Id;
            OrderRepository.Instance.AddPizzaToOrder(currentUserId, pizza);
            return Json(false);
        }

        [Authorize]
        [HttpGet]
        public ActionResult GetCurrentOrder()
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(currentUser.Id);
            return Json(currentOrder, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        [HttpGet]
        public ActionResult GetCurrentOrderPizza()
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(currentUser.Id);
            if (currentOrder == null)
                return Json(false);

            int currentOrderId = currentOrder.Id;
            IEnumerable<Pizza> pizza = OrderRepository.Instance.GetAllPizzaFromOrder(currentOrderId);
            return Json(pizza, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        [HttpPost]
        public ActionResult DeleteOrderPizza(Pizza pizza)
        {
            string currrentUserName = User.Identity.Name;
            int currentUserId = ServiceUserRepository.Instance.GetUserByName(currrentUserName).Id;
            int currentOrderId = OrderRepository.Instance.GetUnConfirmedOrder(currentUserId).Id;
            PizzaToOrderRepository.Instance.DeleteOrderPizza(currentOrderId, pizza);
            return Json(false);
        }

        [Authorize]
        [HttpPost]
        public ActionResult CreatePizza()
        {
            string currrentUserName = User.Identity.Name;
            int currentUserId = ServiceUserRepository.Instance.GetUserByName(currrentUserName).Id;
            PizzaToOrderRepository.Instance.CreatePizza(currentUserId);
            return Json("Pizza created succesfully");
        }

        [Authorize]
        [HttpPost]
        public ActionResult AddIngredient(PizzaModel pizzaModel)
        {
            PizzaIngredientRepository.Instance.AddPizzaIngredient(pizzaModel.PizzaId, pizzaModel.Ingredient);
            return Json("Ingredient added succesfully");
        }

        [Authorize]
        [HttpPost]
        public ActionResult DeleteIngredient(PizzaModel pizzaModel)
        {
            PizzaIngredientRepository.Instance.DeleteIngredient(pizzaModel.PizzaId, pizzaModel.Ingredient);
            return Json("Ingredient deleted succesfully");
        }

        [Authorize]
        [HttpPost]
        public ActionResult IncrementIngredient(PizzaModel pizzaModel)
        {
            PizzaIngredientRepository.Instance.IncrementCount(pizzaModel.PizzaId, pizzaModel.Ingredient.Id);
            return Json("Ingredient incremented succesfully");
        }

        [Authorize]
        [HttpPost]
        public ActionResult DecrementIngredient(PizzaModel pizzaModel)
        {
            PizzaIngredientRepository.Instance.DecrementCount(pizzaModel.PizzaId, pizzaModel.Ingredient.Id);
            return Json("Ingredient decremented succesfully");
        }

        [Authorize]
        [HttpPost]
        public ActionResult ConfirmOrder()
        {
            OrderRepository.Instance.ConfirmOrder(1);
            return Json("Order Successfully Confirmed!");
        }

        [Authorize]
        [HttpGet]
        public ActionResult GetPizzaCount(int id)
        {
            string currrentUserName = User.Identity.Name;
            int currentUserId = ServiceUserRepository.Instance.GetUserByName(currrentUserName).Id;
            Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(currentUserId);
            if (currentOrder == null)
                return Json(false);
            int count = PizzaToOrderRepository.Instance.GetPizzaCountByOrderId(currentOrder.Id, id);
            return Json(count, JsonRequestBehavior.AllowGet);
        }
    }
}