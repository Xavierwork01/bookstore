using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BookStoreAPI.Models
{
    [BsonIgnoreExtraElements] // 如果有多的屬性跟資料等，將忽略它
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int Access { get; set; }
        public string UserPhoto { get; set; }
        public DateTime LastLoginTime { get; set; }
    }
}
