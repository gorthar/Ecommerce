using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;

        public TokenService(UserManager<User> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
        }

        public async Task<string> CreateToken(User user)
        {
            // Create a list of claims
            var claims = new List<Claim>
            {
                // Add the user's email and username to the claims
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            // Get the roles the user is in
            var roles = await userManager.GetRolesAsync(user);
            // Add the roles to the claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            // Create a key using the token key from the appsettings.json file
            //SymmetricSecurityKey is a class that represents a symmetric key and symmetric keys are used to sign the JWT token
            //so what does it mean to sign a JWT token? It is a cryptographic operation that creates a unique hash of the token data using a secret key. The signature ensures the integrity of the token, meaning that it hasn't been tampered with during transmission. When the token is received, the same cryptographic operation can be performed again with the same secret key to verify that the token is authentic and hasn't been altered.


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWTSettings:TokenKey"]));
            // Create the credentials using the key and the HmacSha512Signature algorithm
            //SigningCredentials is a class that represents the credentials used to sign a JWT token
            //What does credentials mean in this context? It's a way to authenticate the token
            //It authenticates the token by signing it with the key and the HmacSha512Signature algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Create a token using the claims, the expiry date, and the credentials
            //JwtSecurityToken is a class that represents a JWT token.
            var tokenOptions = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );
            // Return the token as a string
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

    }
}