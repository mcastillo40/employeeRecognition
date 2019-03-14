using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using employeeRecognition.Extensions;
using employeeRecognition.Models;
using Microsoft.AspNetCore.Http;
using static System.Net.Mime.MediaTypeNames;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace employeeRecognition.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private DataTable dt { get; set; }

        private DbConnection sqlConnection = new DbConnection();

        [HttpGet("[action]")]
        [Authorize]
        public IEnumerable<UserAcct> Index()
        {
            List<UserAcct> list = new List<UserAcct>();

            string sql = @"SELECT * FROM userAcct";

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

            return list;
        }

        [HttpGet("[action]")]
        public IActionResult getUser(int id)
        {
            string sql = $"SELECT userAcct.id, userAcct.first_name, userAcct.last_name, userAcct.email FROM userAcct WHERE userAcct.id={id}";

            dt = sqlConnection.Connection(sql);
           
            DataRow row = dt.Rows[0];

            var user_info = new {
                first_name = row["first_name"].ToString(),
                last_name = row["last_name"].ToString(),
                email = row["email"].ToString(),
            };

            return new ObjectResult(user_info) { StatusCode = 200 };
        }

        [HttpPost("[action]")]
        [Authorize(Roles = "Admin")]
        public IActionResult Create([FromBody]UserAcct User)
        {
            if (ModelState.IsValid)
            {
                List<UserAcct> list = new List<UserAcct>();

                string query = $"INSERT INTO userAcct(first_name, last_name, password, email, role) VALUES" +
                    $"('{User.first_name}', '{User.last_name}', '{User.password}', '{User.email}', {User.role})" +
                    " SELECT id FROM userAcct WHERE id = SCOPE_IDENTITY()";

                string sql = @query;

                dt = sqlConnection.Connection(sql);

                foreach (DataRow row in dt.Rows)
                {
                    var user = new UserAcct();
                    user.id = (int)row["id"];
                    list.Add(user);
                }
                return new ObjectResult(new { Id = list[0].id }) { StatusCode = 201 };
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> UploadSignature(int id)
        {
            var files = HttpContext.Request.Form.Files;

            long size = files.Sum(f => f.Length);

            //// full path to file in temp location
            var filePath = Path.GetTempFileName();

            try
            {
                foreach (var formFile in files)
                {
                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(new { Error = e });
            }

            byte[] bytes = System.IO.File.ReadAllBytes(filePath);

            try
            {
                string query = $"UPDATE userAcct set signature=@binaryValue WHERE userAcct.id={id}";
                string connectionString = @"Data Source = tcp:erraisqlserver.database.windows.net,1433;Initial Catalog=EmployeeDB;Persist Security Info=False;User ID=erraiadmin;Password=DBaccess3;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";
                SqlConnection con = new SqlConnection(connectionString);
                string sql = @query;

                con.Open();

                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlParameter sqlParam = cmd.Parameters.AddWithValue("@binaryValue", bytes);
                    sqlParam.DbType = DbType.Binary;
                    cmd.ExecuteNonQuery();
                }

                con.Close();

                return StatusCode(201);
            }
            catch (Exception e)
            {
                return BadRequest(new { Error = e });
            }
        }

        [HttpDelete("[action]")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            try {
                String query = $"DELETE FROM userAcct WHERE userAcct.id = {id}";

                String sql = @query;

                dt = sqlConnection.Connection(sql);
                return Ok();
            }
            catch (Exception e) {
                return BadRequest(new {error=e});
            }
        }

        [HttpPut("[action]")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminEdit(int id, [FromBody]UserAcct User)
        {
            if (ModelState.IsValid)
            {
                string query = $"Update userAcct set first_name='{User.first_name}', last_name='{User.last_name}', email='{User.email}', role={User.role} WHERE userAcct.id={id}";
                string sql = @query;

                dt = sqlConnection.Connection(sql);

                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPut("[action]")]
        public IActionResult UserEdit(int id, [FromBody]UserAcct User)
        {
            if (ModelState.IsValid)
            {
                string query = $"Update userAcct set first_name='{User.first_name}', last_name='{User.last_name}', email='{User.email}' WHERE userAcct.id={id}";
                string sql = @query;

                dt = sqlConnection.Connection(sql);

                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPut("[action]")]
        public IActionResult EditPassword(int id, [FromBody]UserAcct User)
        {
            try 
            {
                string query = $"Update userAcct set password='{User.password}' WHERE userAcct.id={id}";
                string sql = @query;

                dt = sqlConnection.Connection(sql);

                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(new { Error = e });
            }
        }
    }
}
