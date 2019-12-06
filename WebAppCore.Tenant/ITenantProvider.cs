using System;

namespace WebAppCore.Tenant
{
    public interface ITenantProvider
    {
        string GetTenantId();

    }
}
