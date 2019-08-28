using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.DB.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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
            var list = this._mailCenterContext.McMailList.Include(x => x.MailSendEnd).Include(x => x.MailSendType);
            //// var list = this._mailCenterContext.McMailList.ToList();
            //JsonSerializerSettings settings = new JsonSerializerSettings();
            //// settings.MissingMemberHandling = MissingMemberHandling.Ignore;
            //settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //return new JsonResult(list,settings);
            return new JsonResult(list);
        }


    }
}