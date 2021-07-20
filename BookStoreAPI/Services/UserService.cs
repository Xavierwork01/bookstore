using BookStoreAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Class;

namespace BookStoreAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _user;

        

        public UserService(IDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DataBaseName);
            _user = database.GetCollection<User>("User");
        }

        public List<User> Get() => _user.Find(user => true).ToList();
        public User GetByAccount(string account, string password) => _user.Find<User>(user => user.Account == account && user.Password == MD5Extensions.ToMD5(password)).FirstOrDefault();
        public User CheckRegister(string account) => _user.Find<User>(user => user.Account == account).FirstOrDefault();
        public User GetById(string id) => _user.Find<User>(user => user.Id == id).FirstOrDefault();
        public User Create(User user)
        {
            // 將儲存的密碼轉換MD5
            user.Password = MD5Extensions.ToMD5(user.Password);
            _user.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn) => _user.ReplaceOne(user => user.Id == id, userIn);
        public void Remove(string id) => _user.DeleteOne(user => user.Id == id);
    }
}
