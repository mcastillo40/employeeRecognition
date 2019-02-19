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
        public IEnumerable<Models.award> Nominated()
        {
            List<Models.award> list = new List<Models.award>();
                String sql = @"SELECT * FROM award";
                //con.ConnectionString = @"Server=comp1630.database.windows.net;Database=pubs;User Id=readonlylogin;Password=;";
                dt = sqlConnection.Connection(sql);

                foreach (DataRow row in dt.Rows)
                {
                    var aw = new Models.award();

                    aw.sender_user_id = (int)row["sender_user_id"];
                    aw.recipient_user_id = (int)row["recipient_user_id"];
                    aw.type = row["type"].ToString();
                    aw.time = row["time"].ToString();
                    aw.date = row["date"].ToString();
                    list.Add(aw);
                }
            return list;
        }

        [HttpPost("[action]")]
        public IActionResult Create([FromBody]award A)
        {
            if (ModelState.IsValid)
            {
                String query = $"INSERT INTO award(sender_user_id, recipient_user_id, type, time, date) VALUES" +
                    $"('{A.sender_user_id}', '{A.recipient_user_id}', '{A.type}', '{A.time}', {A.date})";

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
        public IActionResult Edit(int id, [FromBody]award A)
        {
            if (ModelState.IsValid)
            {
                String query = $"Update award set sender_user_id='{A.sender_user_id}', recipient_user_id='{A.recipient_user_id}', type='{A.type}', time={A.time}, date='{A.date}'  WHERE award.id={id}";

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
