using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.DB.Models;

namespace WebAppCore.MvcUI.Controllers
{
    public class MailSendEndController : Controller
    {
        private MailCenterContext _mailCenterContext;

        public MailSendEndController(MailCenterContext mailCenterContext)
        {
            this._mailCenterContext = mailCenterContext;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult List()
        {
            var ends = this._mailCenterContext.McMailSendEnd.ToList();

            return new JsonResult(ends);
        }
    }
}