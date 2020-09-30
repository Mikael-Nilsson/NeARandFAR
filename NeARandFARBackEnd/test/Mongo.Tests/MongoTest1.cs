using System;
using System.IO;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Xunit;
using Xunit.Abstractions;

using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;

using NeARandFARBackEnd;
using Nilsson;

using MongoDB.Bson;

namespace NeARandFARBackEnd.Tests
{

    public class MongoTests : IClassFixture<LaunchSettingsFixture>
    {
        private ITestOutputHelper output;
        LaunchSettingsFixture fixture;

        public MongoTests(ITestOutputHelper output, LaunchSettingsFixture fixture)
        {
            this.output = output;
            this.fixture = fixture;
        }

        [Fact]
        public async void testGetAllDocuments()
        {
            Dictionary<string, string> request = new Dictionary<string, string>() {
                { "collection", "entities"}
            };

            Nilsson.Mongo.MongoClient client = new Nilsson.Mongo.MongoClient();
            Nilsson.Mongo.MongoRequest mongoRequest = new Nilsson.Mongo.MongoRequest(request);

            JsonDocument result = await client.getDocuments(mongoRequest);

            Assert.True(result.RootElement.GetArrayLength() > 0);
        }

        [Fact]
        public async void testGetMultipleDocuments()
        {
            Dictionary<string, string> request = new Dictionary<string, string>() {
                { "collection", "entities"},
                { "query", "{'position.lat': { $gt: 59.29}}" }
            };

            Nilsson.Mongo.MongoClient client = new Nilsson.Mongo.MongoClient();
            Nilsson.Mongo.MongoRequest mongoRequest = new Nilsson.Mongo.MongoRequest(request);

            JsonDocument result = await client.getDocuments(mongoRequest);

            Assert.True(result.RootElement.GetArrayLength() > 0);

        }

        [Fact]
        public async void testCreateOneDocument()
        {
            Dictionary<string, string> request = new Dictionary<string, string>() {
                { "collection", "entities" },
                //{ "query", "[{ 'type': 'account', 'id':20002, 'balance': 10000 },{ 'type': 'account', 'id':20003, 'balance': 10000 }]"}
                { "documents", "{ 'type': 'account', 'id':20001, 'balance': 10000 }"}
            };


            Nilsson.Mongo.MongoClient client = new Nilsson.Mongo.MongoClient();
            Nilsson.Mongo.MongoRequest mongoRequest = new Nilsson.Mongo.MongoRequest(request);
            bool result = await client.createDocument(mongoRequest);

            Assert.True(result);

            // TODO: Mock database
        }

        [Fact]
        public async void testCreateMultipleDocuments()
        {
            Dictionary<string, string> request = new Dictionary<string, string>() {
                { "collection", "entities" },
                { "documents", "[{ 'type': 'account', 'id':20002, 'balance': 10000 },{ 'type': 'account', 'id':20003, 'balance': 10000 }]"}
                //{ "query", "{ 'type': 'account', 'id':20001, 'balance': 10000 }"}
            };

            Nilsson.Mongo.MongoClient client = new Nilsson.Mongo.MongoClient();
            Nilsson.Mongo.MongoRequest mongoRequest = new Nilsson.Mongo.MongoRequest(request);
            bool result = await client.createDocuments(mongoRequest);

            Assert.True(result);

            // TODO: Mock database
        }

        [Fact]
        public async void testUpdateDocument()
        {
            Dictionary<string, string> request = new Dictionary<string, string>() {
                { "collection", "entities" },
                { "query", "{'type': 'account', 'id': 20002}" },
                { "documents", "{$set: {'balance': 10001}}" }
            };

            Nilsson.Mongo.MongoClient client = new Nilsson.Mongo.MongoClient();
            Nilsson.Mongo.MongoRequest mongoRequest = new Nilsson.Mongo.MongoRequest(request);
            bool result = await client.updateDocuments(mongoRequest);

            Assert.True(result);
        }

        [Fact]
        public async void testUpdateDocuments()
        {
            Dictionary<string, string> request = new Dictionary<string, string>() {
                { "collection", "entities" },
                { "query", "{'type': 'account'}" },
                { "documents", "{$set: {'balance': 10010}}" }
            };

            Nilsson.Mongo.MongoClient client = new Nilsson.Mongo.MongoClient();
            Nilsson.Mongo.MongoRequest mongoRequest = new Nilsson.Mongo.MongoRequest(request);
            bool result = await client.updateDocuments(mongoRequest);

            Assert.True(result);
        }

    }
}
