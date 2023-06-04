using MoneyTracker.BLL.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.BLL.Services
{
    internal class PasswordHashService : IPasswordHashService
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 10000;
        private HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
        public string HashPassword(string password, out string salt)
        {
            byte[] saltBytes = GenerateSalt();

            salt = Convert.ToBase64String(saltBytes);

            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] hashedPassword = HashPasswordWithSalt(passwordBytes, saltBytes);

            return Convert.ToBase64String(hashedPassword);
        }

        public bool VerifyPassword(string password, string hashedPassword, string salt)
        {
            byte[] saltBytes = Convert.FromBase64String(salt);
            byte[] storedHashedPassword = Convert.FromBase64String(hashedPassword);

            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] hashedPasswordToVerify = HashPasswordWithSalt(passwordBytes, saltBytes);

            return hashedPasswordToVerify.SequenceEqual(storedHashedPassword);
        }

        private byte[] GenerateSalt()
        {
            byte[] salt = new byte[SaltSize];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
                return salt;
            }
        }

        private byte[] HashPasswordWithSalt(byte[] passwordBytes, byte[] saltBytes)
        {
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                passwordBytes,
                saltBytes,
                Iterations,
                hashAlgorithm,
                HashSize);

            return hash;
        }
    }
}
