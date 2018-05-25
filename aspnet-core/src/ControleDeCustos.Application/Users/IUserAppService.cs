using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ControleDeCustos.Roles.Dto;
using ControleDeCustos.Users.Dto;

namespace ControleDeCustos.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
