using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using employeeRecognition.Extensions;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using Microsoft.Extensions.DependencyInjection;
using System.Text;

using employeeRecognition.Extensions;
using employeeRecognition.Models;

using Microsoft.AspNetCore.Authorization;
using System.Data.SqlClient;
using System.Data;
using System.Net.Sockets;
using System.IO;

using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;


// https://www.youtube.com/watch?v=Y2X5wtuzuX4
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

// https://www.youtube.com/watch?v=lnRBShlB9hA
// 1. instantiate mimemessage class
// 2. From address
// 3. To address
// 4. Subject
// 5. Body
// https://www.excitoninteractive.com/articles/read/69/asp-net-core2/sending-email-using-mailkit



// https://dotnetcoretutorials.com/2017/11/02/using-mailkit-send-receive-email-asp-net-core/
namespace employeeRecognition.Controllers
{
    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        //private Encoding mail;

        private DataTable dt { get; set; }

        private DbConnection sqlConnection = new DbConnection();



        /*****************
         METHOD FOR EMAILING RECOVERED PASSWORD
        *****************/

        [HttpPost("[action]")]
        public IActionResult sendPassword([FromBody]UserAcct User)
        {
            Console.WriteLine("This is emailcontroller");


            // DB part

            List<UserAcct> list = new List<UserAcct>();

            String query = $"SELECT email, password FROM userAcct WHERE email='{User.email}'";

            String sql = @query;

            Console.WriteLine("Query: " + sql);
            dt = sqlConnection.Connection(sql);


            Console.WriteLine(sql);

            if (dt.Rows.Count == 0) 
            {
                Console.WriteLine("No such email found.");
                return BadRequest();
            }

            else 
            {
                DataRow row = dt.Rows[0];
                string email = row["email"].ToString();
                string password = row["password"].ToString();

                Console.WriteLine("Email is: " + email);
                Console.WriteLine("Password is: " + password);


                //Email part

                var message = new MimeMessage();

                // Specify sender email
                message.From.Add(new MailboxAddress("employeerecognition3@gmail.com"));

                // Specify recipient email
                message.To.Add(new MailboxAddress(email)); // replace recipient with {User.email}

                // Subject
                message.Subject = "EmployeeRecognition: Password Recovery Email";

                // Body, will be formatted in HTML format
                message.Body = new TextPart("html")
                {
                    Text = "Your password is: " + password + "<br>" +
                        "Please log in here: https://employeerecognitionproject.azurewebsites.net/"
                };
                // Specify info about the service, how we're going to connect to it
                // Note: this SmtpClient is the one from Mailkit, not the deprecated one from .NET framework. They were named the same.

                try
                {
                    using (var client = new SmtpClient())
                    {
                        client.Connect("smtp.gmail.com", 587, false); //"false" because SSL, we are using less secure app
                        client.AuthenticationMechanisms.Remove("XOAUTH2");
                        client.Authenticate("employeerecognition3@gmail.com", "teamerrai");
                        client.Send(message);
                        client.Disconnect(true);
                    }

                    Console.WriteLine("Send Mail Success.");

                    return Ok();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Send Mail Failed : " + e.Message);
                    return BadRequest();
                }
            }


        }

        /*****************
                TESTER: METHOD FOR EMAILING ATTACHMENT (SEND CERTIFICATE)
               *****************/
        //Test url:  /api/email/sendpdf
        [HttpPost("[action]")]
        public IActionResult SendPdf( [FromBody]JObject jObject)
        //public IActionResult testEmail()
        {
            dynamic obj = jObject;
            try
            {   //parse email and pdf content from object to be set as 2 strings below
                string awardemail = obj.email;
                string strJson = obj.pdfContent;

                //remove unnnecessary information from JSON string (data:application/pdf;base64,)
                string newStr = strJson.Remove(0, 28);
                //convert to System.Byte[] file
                var binData = Convert.FromBase64String(newStr);
                //create temp filepath and filename
                var filePath = Path.GetTempFileName();
                var fileName = filePath + "award.pdf";

                // write content to the pdf
                using (var fs = new FileStream(fileName, FileMode.Create))
                using (var writer = new BinaryWriter(fs))
                {
                    writer.Write(binData, 0, binData.Length);
                    writer.Close();
                }

                var message = new MimeMessage();

                    //Specify sender email
                    message.From.Add(new MailboxAddress("employeerecognition3@gmail.com"));

                    //Specify recipient email
                    message.To.Add(new MailboxAddress(awardemail)); 

                    //Subject
                    message.Subject = "EmployeeRecognition: Award Certificate";

                    //Builder: Set plain-text version of the message text
                    var builder = new BodyBuilder();

                    //Body, will be formatted in HTML format
                    builder.TextBody = @"Congratulations for your hard work!";

                    //Attachment
                    builder.Attachments.Add(fileName);

                    message.Body = builder.ToMessageBody();

                    using (var client = new SmtpClient())
                    {
                        client.Connect("smtp.gmail.com", 587, false); //"false" because SSL, we are using less secure app

                        // Note: since we don't have an OAuth2 token, disable
                        // the XOAUTH2 authentication mechanism.
                        client.AuthenticationMechanisms.Remove("XOAUTH2");

                        client.Authenticate("employeerecognition3@gmail.com", "teamerrai");
                        client.Send(message);
                        client.Disconnect(true);

                    }

                    Console.WriteLine("Send Mail Success.");
                    return Ok();
            }

            catch (Exception e)
            {
                Console.WriteLine("Send Mail Failed : " + e.Message);
                return BadRequest();

            }
        }

        }
}