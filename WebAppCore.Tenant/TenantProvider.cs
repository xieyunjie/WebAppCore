
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace WebAppCore.Tenant
{
    public class TenantProvider : ITenantProvider
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        public TenantProvider(IHttpContextAccessor _httpContextAccessor)
        {
            httpContextAccessor = _httpContextAccessor;
        }
        public string GetTenantId()
        {
            string value = "0";
            if (httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("mailsendtypeid", out value))
            {
                return value;
            }
            return "0";

        }
    }
}
