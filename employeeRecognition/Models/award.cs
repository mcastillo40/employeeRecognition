using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace employeeRecognition.Models
{
    public class award
    {
        public int id { get; set; }
        public int sender_user_id { get; set; }
        public int recipient_user_id { get; set; }
        public string type { get; set; }
        public string time { get; set; }
        public string date { get; set; }
    }


}
