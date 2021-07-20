using BookStoreAPI.Models;
using BookStoreAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStoreAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BooksService _booksService;

        public BooksController(BooksService booksService)
        {
            _booksService = booksService;
        }

        // GET: api/<BooksController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_booksService.Get());
            }
            catch(Exception msg)
            {
                return NotFound(msg);
            }
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public ActionResult GetById(string id)
        {
            try
            {
                return Ok(_booksService.GetById(id));
            }
            catch (Exception msg)
            {
                return NotFound(msg);
            }
        }

        // POST api/<BooksController>
        [HttpPost]
        public ActionResult Post(Books bookIn)
        {
            try
            {
                return Ok(_booksService.Create(bookIn));
            }
            catch (Exception msg)
            {
                return BadRequest(msg);
            }

        }

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, Books bookIn)
        {
            var checkid = _booksService.GetById(id);
            if (checkid == null)
            {
                return NotFound();
            }
            try
            {
                _booksService.Update(id, bookIn);
            }
            catch (Exception msg)
            {
                return BadRequest(msg);
            }

            return NoContent();
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var checkid = _booksService.GetById(id);
            if (checkid == null)
            {
                return NotFound();
            }
            try
            {
                _booksService.Remove(id);
            }
            catch (Exception msg)
            {
                return BadRequest(msg);
            }

            return NoContent();
        }
    }
}
