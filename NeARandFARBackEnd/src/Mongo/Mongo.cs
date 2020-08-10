using Amazon.Lambda.Core;

using System;
using System.Collections.Generic;

using MongoDB.Driver;

[assembly:LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
namespace NeARandFARBackEnd
{

}

namespace NeARandFARBackEnd.Mongo
{
    public class MongoHandler {

        string fakeData = @"
        [
        {
            geometry: 'text',
            value: `.59.293000; 18.050500`,
            scale: '40 40 40',
            position: {
                lat: 59.293000,
                lon: 18.050500
            }
        } ,
        {
            geometry: 'text',
            value: 'assets work!',
            scale: '30 30 30',
            position: {
                lat: 59.293010,
                lon: 18.050510
            }
        },
        {
            geometry: 'text',
            value: 'tunnel under åbyvägen',
            scale: '300 300 300',
            position: {
                lat: 59.292764,
                lon: 18.033877
            }
        }
        ]
        ";

        MongoClient dbClient;

        public MongoHandler() {
            
        }

        MongoRequest checkRequest(MongoRequest request) {

            // If we're already connected, we keep that connection and don't need to check that part of the input
            if(string.IsNullOrEmpty(dbClient.ToString())) {
                
                // mount the connectionstring
                string username = ""; // TODO: env var
                if(!string.IsNullOrEmpty(request.user))
                    username = request.user;

                string password = ""; // TODO: env var
                if(!string.IsNullOrEmpty(request.password))
                    password = request.password;
                
                string connectionString = ""; // TODO: env var
                if(!string.IsNullOrEmpty(request.connectionString))
                    connectionString = request.connectionString;

                request.connectionString = $"mongodb+srv://{username}:{password}@{connectionString}";

                
            }

            return request;
        }


        // TODO: Connect to Mongo
        // TODO: Shouldn't be public in the future
        Response connect(MongoRequest request) {
            // If any of the parameters are empty, check if the appropriate environment variable is there

            Console.WriteLine("Contacting mongo");        

            if(string.IsNullOrEmpty(dbClient.ToString())) {
                dbClient = new MongoClient(request.connectionString);
            }

            Dictionary<string, string> result = new Dictionary<string, string> {
                {"result", "Not Implemented"}
            };

            return new Response(new List<Dictionary<string, string>>(){result});
        }

        // TODO: Get all docs from Mongo
        public Response getAll(MongoRequest request) {
            // I expect nothing in here

            string mongoUser = Environment.GetEnvironmentVariable("mongoUser");
            Console.WriteLine($"mongoUser: {mongoUser}");


            Dictionary<string, string> result = new Dictionary<string, string> {
                {"result", fakeData}
            };

            return new Response(new List<Dictionary<string, string>>(){result});
        }

        // TODO: Get doc from Mongo
        public Response get(MongoRequest request) {
            // I expect an ID here

            Dictionary<string, string> result = new Dictionary<string, string> {
                {"result", "Not Implemented"}
            };

            return new Response(new List<Dictionary<string, string>>(){result});
        }

        // TODO: Write doc to Mongo
        public Response update(MongoRequest request) {
            // I expect the updated documents here
            Dictionary<string, string> result = new Dictionary<string, string> {
                {"result", "Not Implemented"}
            };

            return new Response(new List<Dictionary<string, string>>(){result});
        }

        // TODO: Delete doc from Mongo
        public Response delete(MongoRequest request) {
            // I expect the IDs of documents to delete here
            Dictionary<string, string> result = new Dictionary<string, string> {
                {"result", "Not Implemented"}
            };

            return new Response(new List<Dictionary<string, string>>(){result});
        }

    }

    // TODO: move these

    // TODO: Make abstract parent class, make this child of that
    public class MongoRequest {
        public string id {get; set;}

        public List<string> documents {get; set;}
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