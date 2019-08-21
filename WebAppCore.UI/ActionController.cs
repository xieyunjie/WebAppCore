using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.DB.Models;

namespace WebAppCore.UI
{
    public class ActionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ActionList()
        {
            List<DB.Models.Action> actions = new List<DB.Models.Action>();

            using (ClubContext clubContext = new ClubContext())
            {
                actions = clubContext.Action.ToList();
            }

            return new JsonResult(actions);
        }
    }
}