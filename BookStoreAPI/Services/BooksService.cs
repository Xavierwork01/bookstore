using BookStoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Services
{
    public class BooksService
    {
        private readonly IMongoCollection<Books> _books;

        public BooksService(IDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DataBaseName);
            _books = database.GetCollection<Books>("Books");
        }

        public List<Books> Get() => _books.Find(book => true).ToList();
        public Books GetById(string id) => _books.Find<Books>(book => book.Id == id).FirstOrDefault();
        public Books Create(Books book)
        {
            _books.InsertOne(book);
            return book;
        }

        public void Update(string id, Books bookIn) => _books.ReplaceOne(book => book.Id == id, bookIn);
        public void Remove(string id) => _books.DeleteOne(book => book.Id == id);
    }
}
