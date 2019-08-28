using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.DB.Models;

namespace WebAppCore.MvcUI.Controllers
{
    public class MailSendTypeController : Controller
    {
        private MailCenterContext _mailCenterContext;

        public MailSendTypeController(MailCenterContext mailCenterContext)
        {
            this._mailCenterContext = mailCenterContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult List()
        {
            var typeList = this._mailCenterContext.McMailSendType.ToList();

            return new JsonResult(typeList);
        }
    }
}