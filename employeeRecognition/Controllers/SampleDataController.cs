using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using employeeRecognition.Models;

namespace employeeRecognition.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {

        string connectionstring = @"Data Source = tcp:erraisqlserver.database.windows.net,1433;Initial Catalog=EmployeeDB;Persist Security Info=False;User ID=erraiadmin;Password=DBaccess3;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";
        //List<Models.UserAcct> list1 = new List<Models.UserAcct>();
        List<Models.award> list2 = new List<Models.award>();
        /*
        [HttpPost("Create/{id}")]
        public int AddAward(int recipient_user_id, string type, string date, string time)
        {
            using (SqlConnection con2 = new SqlConnection(connectionstring))
            {
                String sql2 = @"INSERT INTO award (recipient_user_id, type, date, time) VALUES (@recipient_user_id, @type, @date, @time)";
                SqlCommand Ins = new SqlCommand(sql2, con2);

                // Create the parameters.
                Ins.Parameters.Add("@recipient_user_id", SqlDbType.Int, 5, "recipient_user_id");
                Ins.Parameters.Add("@type", SqlDbType.VarChar, 40, "type");
                Ins.Parameters.Add("@date", SqlDbType.VarChar, 40, "date");
                Ins.Parameters.Add("@time", SqlDbType.VarChar, 40, "time");

                Ins.ExecuteNonQuery;
                return 1;
            }
            finally
            {
                con2.Close();
            }
            }
        }

*/
        [HttpPut("Edit/{id}")]  
        
        public int Edit(int id)  
        {  
           SqlConnection con2 = new SqlConnection(connectionstring);
           try
            {
                con2.Open();
                string sql4 = @"UPDATE award SET recipient_user_id = @recipient_user_id, type = @tupe, time = @time, date = @date WHERE id = @id";
                SqlCommand upd = new SqlCommand(sql4, con2);

                // Add the parameters for the UpdateCommand.
                upd.Parameters.Add("@recipient_user_id", SqlDbType.NChar, 5, "recipient_user_id");
                upd.Parameters.Add("@type", SqlDbType.NVarChar, 40, "type");
                upd.Parameters.Add("@time", SqlDbType.NVarChar, 40, "time");
                upd.Parameters.Add("@date", SqlDbType.NVarChar, 40, "date");
                SqlParameter parameter = upd.Parameters.Add("@old", SqlDbType.NChar, 5, "id");
                parameter.SourceVersion = DataRowVersion.Original;

                upd.CommandType = CommandType.Text;
                upd.ExecuteNonQuery();
                return 1;
            }
            finally
            {
                con2.Close();
            }  
        }  

        [HttpDelete("Delete/{id}")]
        public int Delete(int id)
        {
           SqlConnection con2 = new SqlConnection(connectionstring);
           try
            {
                con2.Open();
                string sql5 = @"DELETE FROM award WHERE id = @" + id;
                SqlCommand Del = new SqlCommand(sql5, con2);
                Del.Parameters.Add("@" + id, SqlDbType.Int, 5, "id").SourceVersion = DataRowVersion.Original;
                Del.CommandType = CommandType.Text;
                Del.ExecuteNonQuery();
                return 1;
            }
            finally
            {
                con2.Close();
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<Models.award> Nominated()
        {
            //con.ConnectionString = @"Server=comp1630.database.windows.net;Database=pubs;User Id=readonlylogin;Password=;";
            //runs stored procedure and returns data to main page
            using (SqlConnection con2 = new SqlConnection(connectionstring))
            {
                string sql = @"SELECT * FROM award";
                DataTable dt = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = new SqlCommand(sql, con2);

                da.Fill(dt);

                foreach (DataRow row in dt.Rows)
                {
                    var aw = new Models.award();
                    aw.id = (int)row["id"];
                    aw.recipient_user_id = (int)row["recipient_user_id"];
                    aw.type = row["type"].ToString();
                    aw.time = row["time"].ToString();
                    aw.date = row["date"].ToString();
                    list2.Add(aw);
                }
            }
            return list2;
        }
    }
}
