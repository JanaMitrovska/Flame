using API.Entities;

namespace API.Interfaces
{
    //Authorization service with token
    public interface ITokenService
    {   
        string CreateToken(AppUser user);
    }
}