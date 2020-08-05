using Amazon.Lambda.Core;

using System.Collections.Generic;

[assembly:LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
namespace SpaceWithName
{
    public class HandlerClass
    {
       public ExampleResponse Hello(Request request)
       {
           return new ExampleResponse("{\"text\": \"Go Serverless v1.0! Your function executed successfully!\"}", request);
       }
    }

    public class ExampleResponse
    {
      public string Message {get; set;}
      public Request Request {get; set;}
      public Dictionary<string, string> headers {get; set;}
      public string body {get; set;}

      public ExampleResponse(string message, Request request){
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
