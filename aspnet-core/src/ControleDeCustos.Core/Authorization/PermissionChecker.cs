using Abp.Authorization;
using ControleDeCustos.Authorization.Roles;
using ControleDeCustos.Authorization.Users;

namespace ControleDeCustos.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
