using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;

using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

using MongoDB.Bson;
using NeARandFARBackEnd.Mongo;
using System.Collections.Immutable;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
// [assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace NeARandFARBackEnd.Entities
{

    public class EntityRequest 
    {
        public string id {get; set;}
        public string lat {get; set;}
        public string lon {get; set;}

        public string mongoConnectionString {get; set;}
    }

    public class EntityResponse
    {
        public string body {get; set;}
        public Dictionary<string, string> headers {get; set;}

        public EntityResponse(BsonDocument results) {
            Console.WriteLine(results.ToString());
            body = results.ToString();
            headers = null;
        }
    }

    public class EntityHandler
    {

        MongoClient client;
        
        public EntityHandler() {
            client = new MongoClient();
        }

        /// <summary>
        /// Gets one entity by ID
        /// </summary>
        /// <param name="entityRequest"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
        public async Task<object> getEntityByID(APIGatewayProxyRequest request, ILambdaContext context = null)
        {
            if (context != null && context.FunctionName != null)
                LambdaLogger.Log($"Calling {context.FunctionName}");

            string query = "{'id': " + request.PathParameters["id"] + "}";

            return await get(query);
        }

        /// <summary>
        /// Gets entities by filter or if none, all
        /// </summary>
        /// <param name="request"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<object> getEntities(APIGatewayProxyRequest request, ILambdaContext context = null) {
            if(context != null && context.FunctionName != null)
                LambdaLogger.Log($"Calling {context.FunctionName}");

            //Dictionary<string, string> req = new Dictionary<string, string>(){{"collection", "entities"}};
            string query = request.Body;

            return await get(query);
        }

        private async Task<object> get(string query) {
            Dictionary<string, string> req = new Dictionary<string, string>() { { "collection", "entities" } };
            req["query"] = query;

            MongoRequest mongoRequest = new MongoRequest(req);

            JsonDocument docs = await client.getDocuments(mongoRequest);

            string body = docs.ToString();
            LambdaLogger.Log(body);

            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Headers = new Dictionary<string, string> { { "Access-Control-Allow-Origin", "*" } },
                Body = body
            };
        }

    }
}
