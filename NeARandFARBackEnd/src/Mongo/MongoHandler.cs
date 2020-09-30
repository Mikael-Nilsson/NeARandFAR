using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;

using MongoDB.Bson;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

[assembly:LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
namespace NeARandFARBackEnd
{

}

namespace Nilsson.Mongo
{
    public class MongoHandler {

        MongoClient client;
        
        public MongoHandler() {
            client = new MongoClient();
        }



        // TODO: Get all docs from Mongo
        public async Task<object> getAll(APIGatewayProxyRequest request, ILambdaContext context = null) {
            // I expect nothing in here
            LambdaLogger.Log(request.ToJson().ToString());

            NeARandFARBackEnd.RequestUtil requestUtil = new NeARandFARBackEnd.RequestUtil();
            MongoRequest mongoRequest = new MongoRequest(requestUtil.checkRequest(request, new string[1]{"collection"}));
        

            JsonDocument docs = await client.getDocuments(mongoRequest);

            // return new {context = context};

            return new MongoResponse(new BsonDocument {
                {mongoRequest.collection, docs.ToString()}
            });
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

}