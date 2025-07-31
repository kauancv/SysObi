using SysObiOnline.Enums;

namespace SysObiOnline.Helpers
{
    public static class RoleHelper
    {
        public static string GetRoleName(RoleType role)
        {
            return role switch
            {
                RoleType.Admin => "Administrator",
                RoleType.User => "Regular User",
                _ => "Unknown Role"
            };
        }
    }
}
