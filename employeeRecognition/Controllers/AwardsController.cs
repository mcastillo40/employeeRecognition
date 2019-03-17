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
using Microsoft.AspNetCore.Authorization;

namespace employeeRecognition.Controllers
{
    [Route("api/[controller]")]
    public class AwardsController : Controller
    {
        private DataTable dt { get; set; }

        private DbConnection sqlConnection = new DbConnection();

        [HttpGet("[action]")]
        [Authorize]
        public IEnumerable<award> Nominated()
        {
            List<award> list = new List<award>();

            String sql = @"SELECT award.id, award.sender_user_id, award.recipient_user_id, sender.first_name as sfn, sender.last_name as sln, 
recipient.first_name as rfn, recipient.last_name as rln, recipient.email, sender.signature, award.type, CONVERT(VarChar(7), award.time, 0) as time, format(award.date, 'd') as date
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
                if (!Convert.IsDBNull(row["signature"])){
                Award.signature = (Byte[])row["signature"];
                };
                Award.email = row["email"].ToString();
                Award.time = row["time"].ToString();
                Award.date = row["date"].ToString();
                list.Add(Award);
            }
            return list;
        }

        [HttpGet("[action]")]
        [Authorize]
        public IEnumerable<award> Business(int id, string type, string filter)
        {
            List <award> list2 = new List<award>();
            string sql = "";
            if (filter == "recipient")
            {
                sql = $"SELECT award.id, sender.id as sender_user_id, sender.first_name as sfn, sender.last_name as sln, recipient.id as recipient_user_id, recipient.first_name as rfn, recipient.last_name as rln, award.type, " +
               $"format(award.date, 'd') as date FROM award JOIN userAcct AS sender ON sender.id = award.sender_user_id JOIN userAcct AS recipient ON " +
               $"recipient.id = award.recipient_user_id where award.recipient_user_id ={id}";
            }
            else if (filter == "sender")
            {
                sql = $"SELECT award.id, sender.id as sender_user_id, sender.first_name as sfn, sender.last_name as sln, recipient.id as recipient_user_id, recipient.first_name as rfn, recipient.last_name as rln, award.type, " +
                  $"format(award.date, 'd') as date FROM award JOIN userAcct AS sender ON sender.id = award.sender_user_id JOIN userAcct AS recipient ON " +
                  $"recipient.id = award.recipient_user_id where award.sender_user_id ={id}";
            }
            else if (filter == "type")
            {
                sql = $"SELECT award.id, sender.id as sender_user_id, recipient.id as recipient_user_id, sender.first_name as sfn, sender.last_name as sln, recipient.first_name as rfn, recipient.last_name as rln, award.type, " +
                  $"format(award.date, 'd') as date FROM award JOIN userAcct AS sender ON sender.id = award.sender_user_id JOIN userAcct AS recipient ON " +
                  $"recipient.id = award.recipient_user_id where award.type ='{type}'";
            }
            
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
        [Authorize(Roles = "User")]
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
        [Authorize(Roles = "User")]
        public void Delete(int id)
        {
            String query = $"DELETE FROM award WHERE award.id = {id}";

            String sql = @query;

            Console.WriteLine("QUERY: " + sql);

            dt = sqlConnection.Connection(sql);
        }

        [HttpPut("[action]")]
        [Authorize(Roles = "User")]
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
