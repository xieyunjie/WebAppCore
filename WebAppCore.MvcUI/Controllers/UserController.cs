using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebAppCore.MvcUI.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login(string password, string userName)
        {
            if (password == "ant.design" && userName == "admin")
            {
                return new JsonResult(new
                {
                    status = "ok",
                    type = "",
                    currentAuthority = "admin"
                });
            }
            else if (password == "ant.design" && userName == "user")
            {
                return new JsonResult(new
                {
                    status = "ok",
                    type = "",
                    currentAuthority = "user"
                });
            }
            return new JsonResult(new
            {
                status = "error",
                type = "",
                currentAuthority = "guest"
            });
        }

        public IActionResult CurrentUser()
        {
            return new JsonResult(new
            {
                name = "iamapig",
                avatar = "",
                userid = "00000001",
                email = "abc@qq.com",
                signature = "no pay, no gain",
                title = "码农",
                group = "民工",
                tags = new string[] { },
                notifyCount = 12,
                unreadCount = 11,
                country = "China",
                geographic = new object(),
                address = "天堂",
                phone = "010-110"
            });
        }
    }
}