using System;
using System.Net;
using System.Threading.Tasks;
using System.Collections.Generic;

using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

using MongoDB.Bson;
using NeARandFARBackEnd.Mongo;
using System.Collections.Immutable;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
// [assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace NeARandFARBackEnd.Assets
{

    public class AssetRequest 
    {
        public string id {get; set;}
        public string lat {get; set;}
        public string lon {get; set;}

        public string mongoConnectionString {get; set;}
    }

    public class AssetResponse
    {
        public string body {get; set;}
        public Dictionary<string, string> headers {get; set;}

        public AssetResponse(BsonDocument results) {
            Console.WriteLine(results.ToString());
            body = results.ToString();
            headers = null;
        }
    }

    public class AssetHandler
    {

        MongoClient client;
        
        public AssetHandler() {
            client = new MongoClient();
        }

        /// <summary>
        /// Gets one asset by ID
        /// </summary>
        /// <param name="assetRequest"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
        public async Task<object> getAssetByID(APIGatewayProxyRequest request, ILambdaContext context = null)
        {
            if (context != null && context.FunctionName != null)
                LambdaLogger.Log($"Calling {context.FunctionName}");

            string query = "{'id': " + request.PathParameters["id"] + "}";

            return await get(query);
        }

        /// <summary>
        /// Gets assets by filter or if none, all
        /// </summary>
        /// <param name="request"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<object> getAssets(APIGatewayProxyRequest request, ILambdaContext context = null) {
            if(context != null && context.FunctionName != null)
                LambdaLogger.Log($"Calling {context.FunctionName}");

            //Dictionary<string, string> req = new Dictionary<string, string>(){{"collection", "assets"}};
            string query = request.Body;

            return await get(query);
        }

        private async Task<object> get(string query) {
            Dictionary<string, string> req = new Dictionary<string, string>() { { "collection", "assets" } };
            req["query"] = query;

            MongoRequest mongoRequest = new MongoRequest(req);

            List<BsonDocument> docs = await client.getDocuments(mongoRequest);

            string body = docs.ToJson().ToString();
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
