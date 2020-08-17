using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using MongoDB.Driver;
using MongoDB.Bson;

using Amazon.Lambda.Core;

namespace NeARandFARBackEnd.Mongo
{
    public class MongoClient
    {

        public BsonArray fakeData = new BsonArray {
            new BsonDocument {
                {"geometry", "text"},
                {"value", ".59.293000; 18.050500"},
                {"scale", "40 40 40"},
                {"position", new BsonDocument {
                        {"lat", "59.293000"},
                        {"lon", "18.050500"}
                    }
                }
            },
            new BsonDocument {
                {"geometry", "text"},
                {"value", "assets work!"},
                {"scale", "30 30 30"},
                {"position", new BsonDocument {
                        {"lat", "59.293010"},
                        {"lon", "18.050510"}
                    }
                }
            },
            new BsonDocument {
                {"geometry", "text"},
                {"value", "tunnel under åbyvägen"},
                {"scale", "300 300 300"},
                {"position", new BsonDocument {
                        {"lat", "59.292764"},
                        {"lon", "18.033877"}
                    }
                }
            },
        };

        public MongoDB.Driver.MongoClient dbClient {get; set;}

        public MongoClient() {

        }

        // Connect to Mongo
        public void connect(MongoRequest request) {
            // If any of the parameters are empty, check if the appropriate environment variable is there

            LambdaLogger.Log("Contacting mongo");      

            if(dbClient == null) {
                dbClient = new MongoDB.Driver.MongoClient(request.connectionString);
            }
        }

        public MongoRequest checkRequest(MongoRequest request) {

            // If we're already connected, we keep that connection and don't need to check that part of the input
            if(dbClient == null) {
                // if no database is provided, use env var
                if(string.IsNullOrEmpty(request.database)) {
                    request.database = Environment.GetEnvironmentVariable("mongoDB");
                }

                // if no connectionstring is provided, use env var
                if(string.IsNullOrEmpty(request.connectionString)) {
                    request.connectionString = $"{Environment.GetEnvironmentVariable("mongoConnectionString")}/{request.database}";
                }

                
            }

            // I realised the issue was because of no outbound traffic from lambda.
            //I modified it to be in the VPC that  allowed outbound traffic and/ the connection to Mongo started working.

            return request;
        }


        public async Task<List<BsonDocument>> getAllDocuments(MongoRequest request) {

            request = checkRequest(request);
            LambdaLogger.Log(request.ToString());
            connect(request);
            LambdaLogger.Log(dbClient.Cluster.Description.ToString());

            var collection = dbClient.GetDatabase(request.database).GetCollection<BsonDocument>(request.collection);

            List<BsonDocument> docs = await collection.Find(new BsonDocument()).ToListAsync();
            return docs;
        }

        public async Task<List<BsonDocument>> getMultipleDocuments() {
            return null;
        }

    }
}