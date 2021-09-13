using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    //Authorization service with token
    public interface ITokenService
    {   
        Task<string> CreateToken(AppUser user);
    }
}