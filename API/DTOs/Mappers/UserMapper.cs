using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.Mappers
{
    public static class UserMapper
    {

        public static UserLoggedInDto toLoggedInUserDto(this User user)
        {
            return new UserLoggedInDto
            {

                Email = user.Email,
            };
        }
    }
}