using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using employeeRecognition.Extensions;
using employeeRecognition.Models;

namespace employeeRecognition.Controllers
{
    [Route("api/[controller]")]
    public class AwardsController : Controller
    {
        private DataTable dt { get; set; }

        private DbConnection sqlConnection = new DbConnection();

        [HttpGet("[action]")]
        public IEnumerable<award> Nominated()
        {
            List<award> list = new List<award>();

            String sql = @"SELECT award.id, award.sender_user_id, award.recipient_user_id, userAcct.first_name, userAcct.last_name, award.type, award.time, award.date FROM userAcct
JOIN award ON (userAcct.id = award.recipient_user_id)";
                //con.ConnectionString = @"Server=comp1630.database.windows.net;Database=pubs;User Id=readonlylogin;Password=;";
                dt = sqlConnection.Connection(sql);

                foreach (DataRow row in dt.Rows)
                {
                    var Award = new award();
                    Award.id = (int)row["id"];
                    Award.sender_user_id = (int)row["sender_user_id"];
                    Award.recipient_user_id = (int)row["recipient_user_id"];
                    Award.first_name = row["first_name"].ToString();
                    Award.last_name = row["last_name"].ToString();
                    Award.type = row["type"].ToString();
                    Award.time = row["time"].ToString();
                    Award.date = row["date"].ToString();
                    list.Add(Award);
            }
            return list;
        }

        [HttpPost("[action]")]
        public IActionResult Create([FromBody]award Award)
        {
            if (ModelState.IsValid)
            {
                String query = $"INSERT INTO award(sender_user_id, recipient_user_id, type, time, date) VALUES" +
                    $"({Award.sender_user_id}, {Award.recipient_user_id}, '{Award.type}', '{Award.time}', '{Award.date}')";

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
            String query = $"DELETE FROM award WHERE award.id = {id}";

            String sql = @query;

            Console.WriteLine("QUERY: " + sql);

            dt = sqlConnection.Connection(sql);
        }

        [HttpPut("[action]")]
        public IActionResult Edit(int id, [FromBody]award Award)
        {
            if (ModelState.IsValid)
            {
                String query = $"Update award set sender_user_id={Award.sender_user_id}, recipient_user_id={Award.recipient_user_id}, type='{Award.type}', time='{Award.time}', date='{Award.date}'  WHERE award.id={id}";

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
