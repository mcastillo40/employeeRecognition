using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace employeeRecognition.Models
{
    public class award
    {
        public int id { get; set; }
        public int sender_user_id { get; set; }
        public int recipient_user_id { get; set; }
        public string sfn { get; set; }
        public string sln { get; set; }
        public string rfn { get; set; }
        public string rln { get; set; }
        public string type { get; set; }
        public string time { get; set; }
        public string date { get; set; }
    }
}
