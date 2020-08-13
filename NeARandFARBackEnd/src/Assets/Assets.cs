using System;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;

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

    public class AssetHandler
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public string toUpper(string input, ILambdaContext context)
        {
            return input?.ToUpper();
        }

        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
        public object getAsset(AssetRequest assetRequest, ILambdaContext context = null) {
            LambdaLogger.Log($"Calling {context.FunctionName}");
            
            NeARandFARBackEnd.Mongo.MongoHandler mongo = new Mongo.MongoHandler();
            NeARandFARBackEnd.Mongo.MongoRequest mongoRequest = new Mongo.MongoRequest();

            mongoRequest.connectionString = assetRequest.mongoConnectionString;

            // ! Do we need to massage the result in some way or does this suffice?
            // TODO: Get one asset instead of all
            // return new {assets = mongo.getAll(mongoRequest)};
            return null;
        }

        public async Task<object> getAssets(AssetRequest assetRequest = null, ILambdaContext context = null) {
            if(context != null && context.FunctionName != null)
                LambdaLogger.Log($"Calling {context.FunctionName}");
            
            NeARandFARBackEnd.Mongo.MongoHandler mongo = new Mongo.MongoHandler();
            NeARandFARBackEnd.Mongo.MongoRequest mongoRequest = new Mongo.MongoRequest();

            if(assetRequest != null && assetRequest.mongoConnectionString != null)
                mongoRequest.connectionString = assetRequest.mongoConnectionString;
            
            mongoRequest.collection = "assets";

            // ! Do we need to massage the result in some way or does this suffice?
            // return new {assets = await mongo.getAll(mongoRequest, context)};
            return null;
        }

    }
}
