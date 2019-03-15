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

using Newtonsoft.Json.Linq;

using employeeRecognition.Models;

using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server;



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
         TO WORK ON: METHOD FOR EMAILING ATTACHMENT (SEND CERTIFICATE)
        *****************/
        //Test url:  /api/email/attach
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<string>> attach()
        //public IActionResult testEmail()
        {
            var message = new MimeMessage();

            // Specify sender email
            message.From.Add(new MailboxAddress("employeerecognition3@gmail.com"));

            // Specify recipient email
            message.To.Add(new MailboxAddress("laig@oregonstate.edu")); // replace recipient with {User.email}

            // Subject
            message.Subject = "EmployeeRecognition: Password Recovery Email";


            // Builder: Set plain-text version of the message text
            var builder = new BodyBuilder();

            // Body, will be formatted in HTML format
            builder.TextBody = @"This is the text body";

            // Attachment
            builder.Attachments.Add(@"/Users/Geneva/Desktop/CS467/award.pdf");

            message.Body = builder.ToMessageBody();

            //message.Body = new TextPart("html")
            //{
            //    Text = @"Test email body. "
            //};

            // Specify info about the service, how we're going to connect to it
            // Note: this SmtpClient is the one from Mailkit, not the deprecated one from .NET framework. They were named the same.

            try
            {
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

                return new string[] { "email sent" };

            }
            catch (Exception e)
            {
                Console.WriteLine("Send Mail Failed : " + e.Message);
                return new string[] { "email failed to send" };
            }

        }



        /*****************
        TESTER: METHOD FOR EMAILING ATTACHMENT (SEND CERTIFICATE)
       *****************/
        //Test url:  /api/email/sendpdf
        [HttpPost("[action]")]
        public IActionResult SendPdf([FromBody] string jObject)
        //public IActionResult testEmail()
        {

            Console.WriteLine("jObject is: " + jObject);

            //dynamic obj = jObject;

            //Console.Write("dynamic obj is: " + obj);
            try
            {
              //  string strJson = obj.pdfContent;
               // var match = Regex.Match(strJson, @"data:application/pdf;filename=generated.pdf;base64,(?<data>.+)");
                //var base64Data = match.Groups["data"].Value;
                var binData = Convert.FromBase64String(jObject);
                var filePath = Path.GetTempFileName();


                //create pdf
                // var pdfBinary = Convert.FromBase64String(data);
                //var dir = Server.MapPath("~/DataDump");

                //if (!Directory.Exists(dir))
                //Directory.CreateDirectory(dir);

                //var fileName = dir + "\\PDFnMail-" + DateTime.Now.ToString("yyyyMMdd-HHMMss") + ".pdf";
                var fileName = filePath + ".pdf";

                // write content to the pdf
                using (var fs = new FileStream(fileName, FileMode.Create))
                using (var writer = new BinaryWriter(fs))
                {
                    writer.Write(binData, 0, binData.Length);
                    writer.Close();
                }


                var message = new MimeMessage();
                //using (var memoryStream = new MemoryStream()) 
                //{


                //Newtonsoft.Json.Linq.JToken token = Newtonsoft.Json.Linq.JObject.Parse(result);

                // Specify sender email
                message.From.Add(new MailboxAddress("employeerecognition3@gmail.com"));

                // Specify recipient email
                message.To.Add(new MailboxAddress("laig@oregonstate.edu")); // replace recipient with {User.email}

                // Subject
                message.Subject = "EmployeeRecognition: Award Certificate";


                // Builder: Set plain-text version of the message text
                var builder = new BodyBuilder();

                // Body, will be formatted in HTML format
                builder.TextBody = @"From SendPDF function";

                // Attachment
                //builder.Attachments.Add(@"data:application/pdf;filename=generated.pdf;base64,(?<data>.+)");
                //builder.Attachments.Add(new MemoryStream(binData), "htmlToPdf.pdf");
                var attachment = "@\"" + fileName + "\"";
                builder.Attachments.Add(attachment);


                //mail.Attachments.Add(new Attachment(new MemoryStream(binData), "htmlToPdf.pdf")); // from stackoverflow


                message.Body = builder.ToMessageBody();

                //}


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