using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

            private readonly UserServices _data;
            public UserController(UserServices dataFromService)
            {
                _data = dataFromService;
            }

            //add a user
            [HttpPost("AddUsers")]

            public bool AddUser(CreateAccountDTO UserToAdd)
            {
                return _data.AddUser(UserToAdd);
            }

            //GetAllUser Endpoint
            [HttpGet("GetAllUsers")]
            public IEnumerable<UserModel> GetAllUsers()
            {
                return _data.GetAllUsers();
            }

            //Get user by username
            [HttpGet("GetUserByUsername/{UserName}")]
            public UserIdDTO GetUserIdDTOByUserName(string userName)
            {
                return _data.GetUserIdDTOByUserName(userName);
            }

            //Login
            [HttpPost("Login")]
            public IActionResult Login([FromBody] LoginDTO User)
            {
                return _data.Login(User);
            }

            //delete user account
            [HttpPost("DeleteUser/{userToDelete}")]
            public bool DeleteUser(string userToDelete)
            {
                return _data.DeleteUser(userToDelete);
            }

            //update user account
            [HttpPost("UpdateUser")]
            public bool UpdateUser(int id, string userName)
            {
                return _data.UpdateUser(id,userName);
            }

    }
}