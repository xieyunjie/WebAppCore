using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;
using WebAppCore.DB.Models;

namespace WebAppCore.DB
{
    public class TenantModelCacheKey : ModelCacheKey
    {
        private string _tenantId;
        public TenantModelCacheKey(DbContext context):base(context)
        {
            _tenantId = (context as MailCenterContext)?.TenantId;
        }

        protected override bool Equals(ModelCacheKey other)
            => base.Equals(other) && (other as TenantModelCacheKey)?._tenantId == _tenantId;
    }
}
