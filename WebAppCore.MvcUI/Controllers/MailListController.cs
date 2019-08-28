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

       public IActionResult Save(McMailList mailList)
        {
            try
            {
                if (mailList.Id == 0)
                {
                    this._mailCenterContext.Add(mailList);
                }
                else
                {
                    this._mailCenterContext.Update(mailList);
                }

                this._mailCenterContext.SaveChanges();

                return new JsonResult(new
                {
                    success = true,
                    msg = "保存成功"
                });
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    success = false,
                    msg = ex.Message
                });
            } 
        }

        public IActionResult Delete(int Id)
        {
            try
            {
                var d = this._mailCenterContext.McMailList.FirstOrDefault(x => x.Id == Id);

                this._mailCenterContext.Remove(d);
                this._mailCenterContext.SaveChanges();

                return new JsonResult(new
                {
                    success = true,
                    msg = "删除成功"
                });
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    success = false,
                    msg = ex.Message
                });
            }
        }


    }
}