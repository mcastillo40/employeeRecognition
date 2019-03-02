﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using employeeRecognition.Extensions;
using employeeRecognition.Models;
using Microsoft.AspNetCore.Http;

namespace employeeRecognition.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private DataTable dt { get; set; }

        private DbConnection sqlConnection = new DbConnection();

        [HttpGet("[action]")]
        public IEnumerable<UserAcct> Index()
        {
            List<UserAcct> list = new List<UserAcct>();

            String sql = @"SELECT * FROM userAcct";

            dt = sqlConnection.Connection(sql);

            foreach (DataRow row in dt.Rows)
            {
                var user = new UserAcct();
                user.id = (int)row["id"];
                user.first_name = row["first_name"].ToString();
                user.last_name = row["last_name"].ToString();
                user.email = row["email"].ToString();
                list.Add(user);
            }

            Console.WriteLine("LIST 12345: " + list);

            return list;
        }

        [HttpPost("[action]")]
        [Produces("application/json")]
        public IActionResult Create([FromBody]UserAcct User)
        {
            if (ModelState.IsValid)
            {
                List<UserAcct> list = new List<UserAcct>();

                String query = $"INSERT INTO userAcct(first_name, last_name, password, email, role) VALUES" +
                    $"('{User.first_name}', '{User.last_name}', '{User.password}', '{User.email}', {User.role})" +
                    " SELECT * FROM userAcct WHERE id = SCOPE_IDENTITY()";

                String sql = @query;

                Console.WriteLine("QUERY: " + sql);

                dt = sqlConnection.Connection(sql);

                foreach (DataRow row in dt.Rows)
                {
                    var user = new UserAcct();
                    user.id = (int)row["id"];
                    user.first_name = row["first_name"].ToString();
                    user.last_name = row["last_name"].ToString();
                    user.email = row["email"].ToString();
                    list.Add(user);
                }

                Console.WriteLine("LIST: " + list);
                var newItem = new { test = "new" }; // create the object to return

                return StatusCode(201, newItem);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("[action]")]
        public IActionResult UploadSignature(int id, IList<IFormFile> files)
        {
            Console.WriteLine("USER: ", User);
            Console.WriteLine("Files: ", files);

            if (ModelState.IsValid)
            {
                String query = $"UPDATE userAcct set signature='{files}' WHERE userAcct.id={id}";

                String sql = @query;

                Console.WriteLine("QUERY: " + sql);

                dt = sqlConnection.Connection(sql);

                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("[action]")]
        public void Delete(int id)
        {
            String query = $"DELETE FROM userAcct WHERE userAcct.id = {id}";

            String sql = @query;

            dt = sqlConnection.Connection(sql);
        }

        [HttpPut("[action]")]
        public IActionResult Edit(int id, [FromBody]UserAcct User)
        {
            if (ModelState.IsValid)
            {
                String query = $"Update userAcct set first_name='{User.first_name}', last_name='{User.last_name}', password='{User.password}', email='{User.email}', role={User.role}, signature='{User.signature}' WHERE userAcct.id={id}";

                String sql = @query;

                Console.WriteLine("QUERY: " + sql);

                dt = sqlConnection.Connection(sql);

                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}