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
         TO WORK ON: METHOD FOR EMAILING RECOVERED PASSWORD
        *****************/

        [HttpPost("[action]")]
        public IActionResult Index([FromBody]UserAcct User)
        {
            Console.WriteLine("This is emailcontroller");


            // DB part

            List<UserAcct> list = new List<UserAcct>();

            String query = $"SELECT email, password FROM userAcct WHERE email='{User.email}'";

            String sql = @query;

            Console.WriteLine("Query: " + sql);
            dt = sqlConnection.Connection(sql);


            Console.WriteLine(sql);


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

            try {
                using (var client = new SmtpClient()) {
                    client.Connect("smtp.gmail.com", 587, false); //"false" because SSL, we are using less secure app
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate("employeerecognition3@gmail.com", "teamerrai");
                    client.Send(message);
                    client.Disconnect(true);
                }
               
                Console.WriteLine("Send Mail Success.");

                return Ok();
            }
            catch (Exception e) {
                Console.WriteLine("Send Mail Failed : " + e.Message);
                return BadRequest();
            }



        }


        /*****************
         TO WORK ON: METHOD FOR EMAILING ATTACHMENT (SEND CERTIFICATE)
        *****************/



        /*****************
        // TESTER METHOD TO SEE IF EMAILING WORKS AT ALL.
        // UPDATE: EMAILS CAN BE SENT!
        *****************/
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<string>> testEmail()
        //public IActionResult testEmail()
        {
            var message = new MimeMessage();

            // Specify sender email
            message.From.Add(new MailboxAddress("employeerecognition3@gmail.com"));

            // Specify recipient email
            message.To.Add(new MailboxAddress("laig@oregonstate.edu")); // replace recipient with {User.email}

            // Subject
            message.Subject = "EmployeeRecognition: Password Recovery Email";

            // Body, will be formatted in HTML format
            message.Body = new TextPart("html")
            {
                Text = @"Test email body. " 
            };
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


        // DUMMY METHOD, CAN REMOVE LATER
        public IActionResult Contact() {
            ViewData["Message"] = "Your contact page";
            return View();
        }


        /*****************
         DEMO EMAIL METHOD. DON'T NEED THIS, CAN REMOVE LATER.
        *****************/
        public IActionResult SendMail(string name, string email, string msg)
        {
            var message = new MimeMessage();

            // Specify sender email
            message.From.Add(new MailboxAddress("employeerecognition3@gmail.com"));

            // Specify recipient email
            message.To.Add(new MailboxAddress("laig@oregonstate.edu")); // replace recipient with {User.email}

            // Subject
            message.Subject = name;

            // Body, will be formatted in HTML format
            message.Body = new TextPart("html")
            {
                Text = "From: " + name + "<br>" +
                "Contact information " + email + "<br>" +
                "Message: " + msg
            };
            // Specify info about the service, how we're going to connect to it
            // Note: this SmtpClient is the one from Mailkit, not the deprecated one from .NET framework. They were named the same.
              using (var client = new SmtpClient()) {
                client.Connect("asmtp.gmail.com", 587, false); //"false" because SSL, we are using less secure app
                client.Authenticate("employeerecognition3@gmail.com", "teamerrai");
                client.Send(message);
                client.Disconnect(false);
              }

              //When we've sent the mail, then return back to the contact page, or whatever
            return View("Contact");
        }

    }
}

