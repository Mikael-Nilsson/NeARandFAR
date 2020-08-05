using Amazon.Lambda.Core;

using System;
using System.Collections.Generic;

[assembly:LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
namespace NeARandFARBackEnd.Mongo
{
    public class MongoHandler {

        public MongoHandler() {

        }


        // TODO: Connect to Mongo
        public Response Connect(MongoRequest request) {
        // public Response Connect() {
            // If any of the parameters are empty, check if the appropriate environment variable is there

            Console.WriteLine("Contacting mongo");        
            Console.WriteLine(request.query);
            Console.WriteLine(request.collection);
            Console.WriteLine(request.connectionString);
            Console.WriteLine(request.user);
            Console.WriteLine(request.password);

            Dictionary<string, string> result = new Dictionary<string, string> {
                {"test", "123"}
            };

            return new Response(new List<Dictionary<string, string>>(){result});
        }


        // TODO: Get doc from Mongo

        // TODO: Get all docs from Mongo

        // TODO: Write doc to Mongo

        // TODO: Delete doc from Mongo

    }

    // TODO: move these

    // TODO: Make abstract parent clas, make this child of that
    public class MongoRequest {
        public string query {get; set;}
        public string collection {get; set;}
        public string connectionString {get; set;}
        public string user {get; set;}
        public string password {get; set;}
    }

    public class Response {
        public List<Dictionary<string, string>> body {get; set;}
        public Dictionary<string, string> headers {get; set;}

        public Response(List<Dictionary<string, string>> results) {
            Console.WriteLine(results.ToString());
            body = results;
            headers = null;
            

        }
    }


}