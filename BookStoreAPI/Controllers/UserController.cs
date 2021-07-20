using BookStoreAPI.Class;
using BookStoreAPI.Models;
using BookStoreAPI.Services;
using Microsoft.AspNetCore.Mvc;
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
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        CustomMessage t = new CustomMessage();

        public UserController(UserService userService)
        {
            _userService = userService;
        }


        // GET: api/<UserController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_userService.Get());
            }
            catch (Exception msg)
            {
                return NotFound(msg);
            }
        }

        // GET api/<UserController>/5
        // login登入判斷
        [HttpGet("account/{account}")]
        public ActionResult GetByAccount(string account, string password)
        {
            var checklogin = _userService.GetByAccount(account, password);
            if (checklogin == null)
            {
                return NotFound();
            } else
            {
                return Ok(checklogin);
            }
            
        }

        [HttpGet("id/{id}")]
        public ActionResult GetById(string id)
        {
            try
            {
                return Ok(_userService.GetById(id));
            }
            catch (Exception msg)
            {
                return NotFound(msg);
            }
        }

        // POST api/<UserController>
        [HttpPost]
        public ActionResult Post([FromBody] User userIn)
        {
            //判斷是否已註冊過了
            var checkresult = _userService.CheckRegister(userIn.Account);
            if(checkresult != null)
            {
                return BadRequest(t.RegisteredAccount);
            } else
            {
                try
                {
                    return Ok(_userService.Create(userIn));
                }
                catch (Exception msg)
                {
                    return BadRequest(msg);
                }
            }
            
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, User userIn)
        {
            //var checkid = _userService.GetById(id);
            try
            {
                _userService.Update(id, userIn);
            }
            catch (Exception msg)
            {
                return NotFound(msg);
            }
            return NoContent();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
