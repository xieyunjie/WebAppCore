using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.DB.Models;

namespace WebAppCore.MvcUI.Controllers
{
    public class MailListController : Controller
    {

        private MailCenterContext _mailCenterContext;

        public MailListController(MailCenterContext mailCenterContext)
        {
            this._mailCenterContext = mailCenterContext;

        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult List()
        {
            var list = this._mailCenterContext.McMailList.ToList();

            return new JsonResult(list);
        }


    }
}