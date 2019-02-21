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
                String sql = @"SELECT * FROM award";
                //con.ConnectionString = @"Server=comp1630.database.windows.net;Database=pubs;User Id=readonlylogin;Password=;";
                dt = sqlConnection.Connection(sql);

                foreach (DataRow row in dt.Rows)
                {
                    var award = new award();
                    award.id = (int)row["id"];
                    award.sender_user_id = (int)row["sender_user_id"];
                    award.recipient_user_id = (int)row["recipient_user_id"];
                    award.type = row["type"].ToString();
                    award.time = row["time"].ToString();
                    award.date = row["date"].ToString();
                    list.Add(award);
                }
            return list;
        }

        [HttpPost("[action]")]
        public IActionResult Create([FromBody]award award)
        {
            if (ModelState.IsValid)
            {
                String query = $"INSERT INTO award(sender_user_id, recipient_user_id, type, time, date) VALUES" +
                    $"({award.sender_user_id}, {award.recipient_user_id}, '{award.type}', '{award.time}', '{award.date}')";

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
        public IActionResult Edit(int id, [FromBody]award award)
        {
            if (ModelState.IsValid)
            {
                String query = $"Update award set sender_user_id={award.sender_user_id}, recipient_user_id={award.recipient_user_id}, type='{award.type}', time='{award.time}', date='{award.date}'  WHERE award.id={id}";

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
