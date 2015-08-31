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

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult GetAllUsers ()
        {
            IEnumerable<ServiceUser> users = ServiceUserRepository.Instance.GetAllUsers();
            return Json(users.Select(u => new {Id = u.Id, Name = u.Name, Role = u.Role }), JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult GetAllRoles ()
        {
            IEnumerable<Role> roles = ServiceUserRepository.Instance.GetAllRoles();
            return Json(roles, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public ActionResult AddRole(Role role)
        {
            ServiceUserRepository.Instance.AddRole(role);
            return Json(false);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public ActionResult DeleteRole(Role role)
        {
            ServiceUserRepository.Instance.DeleteRole(role.Id);
            return Json(false);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public ActionResult EditUserRole(UserModel userModel)
        {
            ServiceUserRepository.Instance.EditUserRole(userModel.User.Id, userModel.Role);
            return Json(false);
        }

        [HttpGet]
        public ActionResult GetAllIngredients()
        {
            IEnumerable<Ingredient> ingredients = IngredientRepository.Instance.GetAllIngredients();
            return Json(ingredients, JsonRequestBehavior.AllowGet);
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

        [Authorize(Roles = "Client")]
        [HttpPost]
        public ActionResult AddPizzaToOrder(Pizza pizza)
        {
            string currrentUserName = User.Identity.Name;
            int currentUserId = ServiceUserRepository.Instance.GetUserByName(currrentUserName).Id;
            OrderRepository.Instance.AddPizzaToOrder(currentUserId, pizza);
            return Json(false);
        }

        [Authorize(Roles = "Client")]
        [HttpGet]
        public ActionResult GetCurrentOrder()
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(currentUser.Id);
            return Json(currentOrder, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Client")]
        [HttpGet]
        public ActionResult GetCurrentOrderPizza()
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            Order currentOrder = OrderRepository.Instance.GetUnConfirmedOrder(currentUser.Id);
            if (currentOrder == null)
                return Json(false);

            int currentOrderId = currentOrder.Id;
            IEnumerable<PizzaToOrder> pizza = PizzaToOrderRepository.Instance.GetPizzaToOrderByOrderId(currentOrderId);
            return Json(pizza.Select(p => new {Pizza = p.Pizza, Count = p.Count }), JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Client")]
        [HttpPost]
        public ActionResult DeleteOrderPizza(Pizza pizza)
        {
            string currrentUserName = User.Identity.Name;
            int currentUserId = ServiceUserRepository.Instance.GetUserByName(currrentUserName).Id;
            int currentOrderId = OrderRepository.Instance.GetUnConfirmedOrder(currentUserId).Id;
            PizzaToOrderRepository.Instance.DeleteOrderPizza(currentOrderId, pizza);
            return Json(false);
        }

        [Authorize(Roles = "Client")]
        [HttpPost]
        public ActionResult CreatePizza()
        {
            string currrentUserName = User.Identity.Name;
            int currentUserId = ServiceUserRepository.Instance.GetUserByName(currrentUserName).Id;
            PizzaToOrderRepository.Instance.CreatePizza(currentUserId);
            return Json("Pizza created succesfully");
        }

        [Authorize(Roles = "Client")]
        [HttpPost]
        public ActionResult AddIngredient(PizzaModel pizzaModel)
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            PizzaIngredientRepository.Instance.AddPizzaIngredient(currentUser.Id, pizzaModel.PizzaId, pizzaModel.Ingredient);
            return Json("Ingredient added succesfully");
        }

        [Authorize(Roles = "Client")]
        [HttpPost]
        public ActionResult DeleteIngredient(PizzaModel pizzaModel)
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            PizzaIngredientRepository.Instance.DeleteIngredient(currentUser.Id, pizzaModel.PizzaId, pizzaModel.Ingredient);
            return Json("Ingredient deleted succesfully");
        }

        [Authorize(Roles = "Client")]
        [HttpPost]
        public ActionResult IncrementIngredient(PizzaModel pizzaModel)
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            PizzaIngredientRepository.Instance.IncrementCount(currentUser.Id, pizzaModel.PizzaId, pizzaModel.Ingredient.Id);
            return Json("Ingredient incremented succesfully");
        }

        [Authorize(Roles = "Client")]
        [HttpPost]
        public ActionResult DecrementIngredient(PizzaModel pizzaModel)
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            PizzaIngredientRepository.Instance.DecrementCount(currentUser.Id, pizzaModel.PizzaId, pizzaModel.Ingredient.Id);
            return Json("Ingredient decremented succesfully");
        }

        [Authorize(Roles = "Client")]
        [HttpPost]
        public ActionResult ConfirmOrder()
        {
            ServiceUser currentUser = ServiceUserRepository.Instance.GetUserByName(User.Identity.Name);
            OrderRepository.Instance.ConfirmOrder(currentUser.Id);
            return Json("Order Successfully Confirmed!");
        }


        [Authorize(Roles = "Cooker")]
        [HttpGet]
        public ActionResult GetCountIngredientsByPizzaId(int id)
        {
            IEnumerable<PizzaIngredient> ingredients = PizzaIngredientRepository.Instance.GetAllPizzaIngredients(id);
            return Json(ingredients, JsonRequestBehavior.AllowGet);
        }




        [Authorize(Roles = "Cooker")]
        [HttpGet]
        public ActionResult GetAllShifts()
        {
            IEnumerable<Shift> shift = ShiftRepository.Instance.GetAllShifts();
            return Json(shift, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Cooker")]
        [HttpPost]
        public ActionResult UpdateStock(UpdateCountStock updater)
        {
            StockRepository.Instance.UpdateStock(updater.Id, updater.Count);
            return Json(false);
        }

        [Authorize(Roles = "Cooker")]
        [HttpGet]
        public ActionResult GetPizzasToCook()
        {
            IEnumerable<Pizza> pizzas = PizzaToOrderRepository.Instance.GetPizzasToCook();
            return Json(pizzas, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Cooker")]
        [HttpGet]
        public ActionResult GetPizzaByIdWithIngredients(int id)
        {
            Pizza pizza = PizzaRepository.Instance.GetPizzaById(id);
            return Json(pizza, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Cooker")]
        [HttpGet]
        public ActionResult GetIngredientsNameByIds(int[] ids)
        {
            IEnumerable<Ingredient> ingredients = IngredientRepository.Instance.GetIngredientsNameByIds(ids);
            return Json(ingredients, JsonRequestBehavior.AllowGet);
        }
    }
}