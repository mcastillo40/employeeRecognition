using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace employeeRecognition.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        string connectionString = @"Data Source = tcp:erraisqlserver.database.windows.net,1433;Initial Catalog=EmployeeDB;Persist Security Info=False;User ID=erraiadmin;Password=DBaccess3;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";

        [HttpGet("[action]")]
        public IEnumerable<Models.UserAcct> Index()
        {
            List<Models.UserAcct> list = new List<Models.UserAcct>();

            // runs stored procedure and returns data to main page
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                String sql = @"SELECT * FROM userAcct";

                DataTable dt = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = new SqlCommand(sql, con);

                da.Fill(dt);

                foreach (DataRow row in dt.Rows)
                {
                    var user = new Models.UserAcct();
                    user.id = (int)row["id"];
                    user.first_name = row["first_name"].ToString();
                    user.last_name = row["last_name"].ToString();
                    user.email = row["email"].ToString();
                    list.Add(user);
                }
            }

            return list;
        }
    }
}