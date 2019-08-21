using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.DB.Models;

namespace WebAppCore.MvcUI.Controllers
{
    public class ActionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private ClubContext _clubContext = null;

        public ActionController(ClubContext clubContext)
        {
            this._clubContext = clubContext;

        }

        public IActionResult ActionList()
        {
            List<DB.Models.Action> actions = new List<DB.Models.Action>();

            //using (ClubContext clubContext = new ClubContext())
            //{
            //    actions = clubContext.Action.ToList();
            //}
            actions = _clubContext.Action.ToList();

            return new JsonResult(actions);
        }
    }
}