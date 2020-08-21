using System;
using System.Net;
using System.Threading.Tasks;
using System.Collections.Generic;

using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

using MongoDB.Bson;
using NeARandFARBackEnd.Mongo;

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

        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
        public object getAsset(AssetRequest assetRequest, ILambdaContext context = null) {
            LambdaLogger.Log($"Calling {context.FunctionName}");
            
            NeARandFARBackEnd.Mongo.MongoHandler mongo = new Mongo.MongoHandler();
            // NeARandFARBackEnd.Mongo.MongoRequest mongoRequest = new Mongo.MongoRequest();

            // mongoRequest.connectionString = assetRequest.mongoConnectionString;

            // ! Do we need to massage the result in some way or does this suffice?
            // TODO: Get one asset instead of all
            // return new {assets = mongo.getAll(mongoRequest)};
            return null;
        }

        public async Task<object> getAssets(APIGatewayProxyRequest request, ILambdaContext context = null) {
            if(context != null && context.FunctionName != null)
                LambdaLogger.Log($"Calling {context.FunctionName}");

            Dictionary<string, string> req = new Dictionary<string, string>(){{"collection", "assets"}};

            MongoRequest mongoRequest = new MongoRequest(req);

            List<BsonDocument> docs = await client.getAllDocuments(mongoRequest);

            string body = docs.ToJson().ToJson().ToString();
            LambdaLogger.Log(body);

            // return new AssetResponse(new BsonDocument {
            //     {"assets", new BsonArray(docs)}
            // });
            
            return new APIGatewayProxyResponse {
                StatusCode = (int)HttpStatusCode.OK,
                Headers = new Dictionary<string, string> {{"Access-Control-Allow-Origin", "*"}},
                Body = body
            };

            // return new {
            //     StatusCode = (int)HttpStatusCode.OK,
            //     Headers = new Dictionary<string, string> {{"Access-Control-Allow-Origin", "*"}},
            //     Body = body
            // };
        }

    }
}
