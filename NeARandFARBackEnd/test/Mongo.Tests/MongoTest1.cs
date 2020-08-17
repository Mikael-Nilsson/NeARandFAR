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

    public class getAllTest : IClassFixture<LaunchSettingsFixture>
    {
        private ITestOutputHelper output;
        LaunchSettingsFixture fixture;

        public getAllTest(ITestOutputHelper output, LaunchSettingsFixture fixture) {
            this.output = output;
            this.fixture = fixture;
        }

        [Fact]
        public async void Test1()
        {
            NeARandFARBackEnd.Mongo.MongoHandler handler = new NeARandFARBackEnd.Mongo.MongoHandler();
            APIGatewayProxyRequest request = new APIGatewayProxyRequest();
            // request.QueryStringParameters = new Dictionary<string, string>() {{"collection","assets"}};
            request.Body = "{\"collection\": \"assets\"}";
            // (new Dictionary<string, string>(){{"collection", "assets"}}).ToJson().ToString();
            object result = await handler.getAll(request);

            Assert.NotNull(result);
        }
    }       
}
