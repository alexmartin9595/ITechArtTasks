using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PizzaService.Entities;

namespace PizzaService.Data
{
    public class ShiftRepository
    {
        private static ShiftRepository instance;

        public static ShiftRepository Instance
        {
            get
            {
                if (instance == null)
                    instance = new ShiftRepository();
                return instance;
            }
        }

        public IEnumerable<Shift> GetAllShifts()
        {
            using (var context = new PizzaSericeContext())
            {
                return context.Shifts.ToList();
            }
        }
    }
}