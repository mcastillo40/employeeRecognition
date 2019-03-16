﻿//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;

//// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//// https://www.youtube.com/watch?v=1wc8gWfKWn0
//using System.IO;
//using System.Text;
//using System.Threading.Tasks;

//namespace WebUi.Features.Messaging
//{
//    public class Attachment
//    {
//        public Attachment(string fileName, object content)
//        {
//            Content = content;
//            FileName = fileName;
//            Type = AttachmentType.Text;
//        }

//        public enum AttachmentType
//        {
//            Json,
//            Text
//        }

//        public object Content { get; set; }
//        public string FileName { get; set; }
//        public AttachmentType Type { get; set; }

//        public async Task<MemoryStream> ContentToStreamAsync()
//        {
//            string text;
//            switch (Type)
//            {
//                case AttachmentType.Json:
//                    text = Newtonsoft.Json.JsonConvert.SerializeObject(Content);
//                    break;
//                case AttachmentType.Text:
//                    text = Content.ToString();
//                    break;
//                default:
//                    throw new ArgumentOutOfRangeException();
//            }

//            // Would create a string extension method to be able to reuse the following.
//            var stream = new MemoryStream();
//            var writer = new StreamWriter(stream, Encoding.UTF8);
//            await writer.WriteAsync(text);
//            await writer.FlushAsync();
//            stream.Position = 0;
//            return stream;
//        }
//    }
//}