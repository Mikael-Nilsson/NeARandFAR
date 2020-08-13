using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using MongoDB.Bson;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

[assembly:LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
namespace NeARandFARBackEnd
{

}

namespace NeARandFARBackEnd.Mongo
{
    public class MongoHandler {

        MongoClient client;
        
        public MongoHandler() {
            client = new MongoClient();
        }

        // TODO: Get all docs from Mongo
        public async Task<object> getAll(Amazon.Lambda.APIGatewayEvents.APIGatewayProxyRequest request, ILambdaContext context = null) {
            // I expect nothing in here
            
            MongoRequest mongoRequest = new MongoRequest();
            mongoRequest.collection = request.QueryStringParameters["collection"];
            

            List<BsonDocument> docs = await client.getAllDocuments(mongoRequest);

            return new {context = context};

            // return new MongoResponse(new BsonDocument {
            //     {request.collection, new BsonArray(docs)}
            // });
        }

        // TODO: Get doc from Mongo
        public MongoResponse get(MongoRequest request) {
            // I expect an ID or position here

            BsonDocument result = new BsonDocument {
                {"result", "Not Implemented"}
            };

            return new MongoResponse(result);
        }

        // TODO: Write doc to Mongo
        public MongoResponse update(MongoRequest request) {
            // I expect the updated documents here
            BsonDocument result = new BsonDocument {
                {"result", "Not Implemented"}
            };

            return new MongoResponse(result);
        }

        // TODO: Delete doc from Mongo
        public MongoResponse delete(MongoRequest request) {
            // I expect the IDs of documents to delete here
            BsonDocument result = new BsonDocument {
                {"result", "Not Implemented"}
            };

            return new MongoResponse(result);
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
        public string database {get; set;}
        public string user {get; set;}
        public string password {get; set;}

        public override string ToString() {
            string result = $"id: {this.id}, query: {this.query}, collection: {this.collection}, connectionString: {this.connectionString}, database: {this.database}";
            return result;
        }
    }

    public class MongoResponse {
        public string body {get; set;}
        public Dictionary<string, string> headers {get; set;}

        public MongoResponse(BsonDocument results) {
            Console.WriteLine(results.ToString());
            body = results.ToString();
            headers = null;
        }
    }


}