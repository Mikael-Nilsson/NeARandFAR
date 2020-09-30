using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;

using MongoDB.Driver;
using MongoDB.Bson;

using Amazon.Lambda.Core;

namespace Nilsson.Mongo
{
    public class MongoClient
    {
        
        public BsonArray fakeData = new BsonArray
        {
            new BsonDocument
            {
                { "geometry", "text" },
                { "value", ".59.293000; 18.050500" },
                { "scale", "40 40 40" },
                {
                    "position",
                    new BsonDocument
                    {
                        { "lat", "59.293000" },
                        { "lon", "18.050500" }
                    }
                }
            }
        };

        public MongoDB.Driver.MongoClient dbClient { get; set; }

        string database;
        string connectionString;

        public MongoClient()
        {

        }

        public MongoClient(string connectionString, string database) {
            this.database = database;
            this.connectionString = connectionString;
        }

        // Connect to Mongo
        public void connect(MongoRequest request)
        {
            // If any of the parameters are empty, check if the appropriate environment variable is there

            LambdaLogger.Log("Contacting mongo");

            if (dbClient == null)
            {
                dbClient = new MongoDB.Driver.MongoClient(request.connectionString);
            }
        }

        public MongoRequest checkRequest(MongoRequest request)
        {

            LambdaLogger.Log($"dbClient is created: {dbClient != null}");
            LambdaLogger.Log("checking connection settings");
            LambdaLogger.Log($"database is empty: {(string.IsNullOrEmpty(request.database) && string.IsNullOrEmpty(this.database)).ToString()}");

            if (string.IsNullOrEmpty(request.database))
            {
                if(this.database != null) {
                    request.database = this.database;
                } else {
                    request.database = Environment.GetEnvironmentVariable("mongoDB");
                }
            }
            LambdaLogger.Log($"database: {request.database}");

            // If we're already connected, we keep that connection and don't need to check that part of the input
            if (dbClient == null)
            {
                // if no database is provided, use env var

                LambdaLogger.Log($"and connstring is empty: {string.IsNullOrEmpty(request.connectionString).ToString()}");

                // if no connectionstring is provided, use env var
                
                if (string.IsNullOrEmpty(request.connectionString))
                {
                    if(this.connectionString != null) {
                        request.connectionString = this.connectionString;
                    } else {
                        request.connectionString = $"{Environment.GetEnvironmentVariable("mongoConnectionString")}/{request.database}";
                    }
                }
                LambdaLogger.Log($"connstring: {request.connectionString}");

            }

            // I realised the issue was because of no outbound traffic from lambda.
            //I modified it to be in the VPC that  allowed outbound traffic and/ the connection to Mongo started working.

            return request;
        }


        public async Task<JsonDocument> getDocuments(MongoRequest request)
        {

            LambdaLogger.Log(request.ToString());
            request = this.checkRequest(request);
            connect(request);
            LambdaLogger.Log(dbClient.Cluster.Description.ToString());

            IMongoCollection<BsonDocument> collection = dbClient.GetDatabase(request.database).GetCollection<BsonDocument>(request.collection);

            // Handle filters
            BsonDocument query = new BsonDocument();
            if (request.query != null)
            {
                query = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(request.query);
            }

            
            List<BsonDocument> docs = await collection.Find(query).Project("{_id: 0}").ToListAsync();
            JsonDocument result =  JsonDocument.Parse(docs.ToJson<List<BsonDocument>>());
            return result;
        }

        enum operation {
            createDocument,
            createDocuments,
            updateDocuments
        };

        async Task<bool> write(operation op, MongoRequest request) {

            LambdaLogger.Log(request.ToString());
            request = this.checkRequest(request);
            connect(request);
            LambdaLogger.Log(dbClient.Cluster.Description.ToString());

            IMongoCollection<BsonDocument> collection = dbClient.GetDatabase(request.database).GetCollection<BsonDocument>(request.collection);

            BsonDocument document = new BsonDocument();
            List<BsonDocument> documents = new List<BsonDocument>();

            switch (op) {
                case operation.createDocument:
                    document = request.documents[0].ToBsonDocument();
                    await collection.InsertOneAsync(document);
                    return true;
                case operation.createDocuments:
                    await collection.InsertManyAsync(request.documents);
                    return true;
                case operation.updateDocuments:
                    BsonDocument filter = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(request.query);
                    BsonDocument update = request.documents[0];

                    var result = await collection.UpdateManyAsync(filter, update);

                    if (result.ModifiedCount > 0)
                        return true;
                    else return false;

            }

            return false;
        }


        public async Task<bool> createDocument(MongoRequest request)
        {
            if (request.documents != null)
            {
                return await write(operation.createDocument, request);
            } else return false;
        }

        public async Task<bool> createDocuments(MongoRequest request)
        {
            if (request.documents != null) {
                return await write(operation.createDocuments, request);
            } else return false;
        }

        public async Task<bool> updateDocuments(MongoRequest request)
        {
            if (request.documents != null)
            {
                return await write(operation.updateDocuments, request);
            }
            else return false;
        }




    }

    // TODO: move these

    // TODO: Make abstract parent class, make this child of that
    public class MongoRequest
    {
        public string id { get; set; }

        public List<BsonDocument> documents { get; set; }
        public string query { get; set; }
        public string collection { get; set; }
        public string connectionString { get; set; }
        public string database { get; set; }
        public string user { get; set; }
        public string password { get; set; }

        public MongoRequest(Dictionary<string, string> request)
        {

            if (request.ContainsKey("id") && request["id"] != null)
                this.id = request["id"];

            if (request.ContainsKey("query") && request["query"] != null)
                this.query = request["query"];

            if (request.ContainsKey("collection") && request["collection"] != null)
                this.collection = request["collection"];

            if (request.ContainsKey("connectionString") && request["connectionString"] != null)
                this.connectionString = request["connectionString"];

            if (request.ContainsKey("database") && request["database"] != null)
                this.database = request["database"];

            if (request.ContainsKey("user") && request["user"] != null)
                this.user = request["user"];

            if (request.ContainsKey("password") && request["password"] != null)
                this.password = request["password"];

            if (request.ContainsKey("documents") && request["documents"] != null) {
                if (request["documents"].Substring(0, 1) == "[")
                    this.documents = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<List<BsonDocument>>(request["documents"]);
                else
                    this.documents = new List<BsonDocument>() { MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(request["documents"]) };
            }
        }

        public override string ToString()
        {
            string result = $"id: {this.id}, query: {this.query}, collection: {this.collection}, connectionString: {this.connectionString}, database: {this.database}";
            return result;
        }
    }

    public class MongoResponse
    {
        public string body { get; set; }
        public Dictionary<string, string> headers { get; set; }

        public MongoResponse(BsonDocument results)
        {
            Console.WriteLine(results.ToString());
            body = results.ToString();
            headers = null;
        }
    }

}
