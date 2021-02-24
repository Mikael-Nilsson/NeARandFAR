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
                { "query", "{'position.lat': { $gt: 59.2}}" }
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
                {"documents", "{ 'geometry': 'text', 'value': 'test', 'scale': '30 30 30', 'position': { 'lat': '59.30', 'lon': '18.1' }}"}
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
                {"documents", "[{ 'geometry': 'text', 'value': 'test1', 'scale': '30 30 30', 'position': { 'lat': '59.2929', 'lon': '18.1' }},{ 'geometry': 'text', 'value': 'test2', 'scale': '30 30 30', 'position': { 'lat': '59.31', 'lon': '18.1' }}]"}
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
                { "query", "{'geometry': 'text', 'value': 'test2'}" },
                { "documents", "{$set: {'value': 'test3'}}" }
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
                { "query", "{'geometry': 'text'}" },
                { "documents", "{$set: {'scale': '50 50 50'}}" }
            };

            Nilsson.Mongo.MongoClient client = new Nilsson.Mongo.MongoClient();
            Nilsson.Mongo.MongoRequest mongoRequest = new Nilsson.Mongo.MongoRequest(request);
            bool result = await client.updateDocuments(mongoRequest);

            Assert.True(result);
        }

    }
}
