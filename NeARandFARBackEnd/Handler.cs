using Amazon.Lambda.Core;

using System.Collections.Generic;

[assembly:LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
namespace AwsDotnetCsharp
{
    public class Handler
    {
       public Response Hello(Request request)
       {
           return new Response("{\"text\": \"Go Serverless v1.0! Your function executed successfully!\"}", request);
       }
    }

    public class Response
    {
      public string Message {get; set;}
      public Request Request {get; set;}
      public Dictionary<string, string> headers {get; set;}
      public string body {get; set;}

      public Response(string message, Request request){
        body = message;
        headers = null;
      }
    }

    public class Request
    {
      public string Key1 {get; set;}
      public string Key2 {get; set;}
      public string Key3 {get; set;}
    }
}
