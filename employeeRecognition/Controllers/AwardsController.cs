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

            String sql = @"SELECT award.id, award.sender_user_id, award.recipient_user_id, sender.first_name as sfn, sender.last_name as sln, 
recipient.first_name as rfn, recipient.last_name as rln, award.type, CONVERT(VarChar(7), award.time, 0) as time, format(award.date, 'd') as date
FROM award JOIN userAcct AS sender ON sender.id = award.sender_user_id JOIN userAcct AS recipient ON recipient.id = award.recipient_user_id";
            
//SELECT award.id, award.sender_user_id, award.recipient_user_id, userAcct.first_name, userAcct.last_name, award.type, award.time, award.date FROM userAcct
//JOIN award ON (userAcct.id = award.recipient_user_id)
            dt = sqlConnection.Connection(sql);

            foreach (DataRow row in dt.Rows)
            {
                var Award = new award();
                Award.id = (int)row["id"];
                Award.sender_user_id = (int)row["sender_user_id"];
                Award.recipient_user_id = (int)row["recipient_user_id"];
                Award.sfn = row["sfn"].ToString();
                Award.sln = row["sln"].ToString();
                Award.rfn = row["rfn"].ToString();
                Award.rln = row["rln"].ToString();
                Award.type = row["type"].ToString();
                Award.time = row["time"].ToString();
                Award.date = row["date"].ToString();
                list.Add(Award);
            }
            return list;
        }

        [HttpGet("[action]")]
        public IEnumerable<award> Business([FromBody]award Aw)
        {
            List<award> list2 = new List<award>();
            String sql = $"SELECT sender.first_name as sfn, sender.last_name as sln, recipient.first_name as rfn, recipient.last_name as rln, award.type, format(award.date, 'd') as date FROM award JOIN userAcct AS sender ON sender.id = award.sender_user_id JOIN userAcct AS recipient ON recipient.id = award.recipient_user_id"
                + $"({Aw.sender_user_id}, {Aw.recipient_user_id}, '{Aw.type}', '{Aw.date}')";
            dt = sqlConnection.Connection(sql);

            foreach (DataRow row in dt.Rows)
            {
                var Award = new award();
                Award.id = (int)row["id"];
                Award.sender_user_id = (int)row["sender_user_id"];
                Award.recipient_user_id = (int)row["recipient_user_id"];
                Award.sfn = row["sfn"].ToString();
                Award.sln = row["sln"].ToString();
                Award.rfn = row["rfn"].ToString();
                Award.rln = row["rln"].ToString();
                Award.type = row["type"].ToString();
                Award.date = row["date"].ToString();
                list2.Add(Award);
            }
            return list2;
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
