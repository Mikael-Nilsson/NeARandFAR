using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Xunit;
using Xunit.Abstractions;

using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;

using NeARandFARBackEnd;

using MongoDB.Bson;

namespace NeARandFARBackEnd.Tests
{

    public class MongoTests : IClassFixture<LaunchSettingsFixture>
    {
        private ITestOutputHelper output;
        LaunchSettingsFixture fixture;

        public MongoTests(ITestOutputHelper output, LaunchSettingsFixture fixture) {
            this.output = output;
            this.fixture = fixture;
        }

        [Fact]
        public async void testGetAllDocuments()
        {
            Dictionary<string, string> request = new Dictionary<string, string>() {
                { "collection", "assets"}
            };

            NeARandFARBackEnd.Mongo.MongoClient client = new Mongo.MongoClient();
            NeARandFARBackEnd.Mongo.MongoRequest mongoRequest = new Mongo.MongoRequest(request);

            var result = await client.getDocuments(mongoRequest);

            Assert.True(result.Count > 0);
        }

        [Fact]
        public async void testGetMultipleDocuments() {
            Dictionary<string, string> request = new Dictionary<string, string>() {
                { "collection", "assets"},
                { "query", "{'position.lat': { $gt: 59.29}}" }
            };

            NeARandFARBackEnd.Mongo.MongoClient client = new Mongo.MongoClient();
            NeARandFARBackEnd.Mongo.MongoRequest mongoRequest = new Mongo.MongoRequest(request);

            var result = await client.getDocuments(mongoRequest);

            Assert.True(result.Count > 0);

        }
    }       
}
