using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace WebAppCore.DB
{
    public class TenantModelFactory : IModelCacheKeyFactory
    {
        public object Create(DbContext context)
            => new TenantModelCacheKey(context);
    }
}
