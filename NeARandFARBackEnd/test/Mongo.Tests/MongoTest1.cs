using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Xunit;
using Xunit.Abstractions;

using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;

using NeARandFARBackEnd;

namespace NeARandFARBackEnd.Tests
{

    public class UnitTest1 : IClassFixture<LaunchSettingsFixture>
    {
        private ITestOutputHelper output;
        LaunchSettingsFixture fixture;

        public UnitTest1(ITestOutputHelper output, LaunchSettingsFixture fixture) {
            this.output = output;
            this.fixture = fixture;
        }

        [Fact]
        public async void Test1()
        {
            NeARandFARBackEnd.Mongo.MongoHandler handler = new NeARandFARBackEnd.Mongo.MongoHandler();
            APIGatewayProxyRequest request = new APIGatewayProxyRequest();
            request.QueryStringParameters = new Dictionary<string, string>() {{"collection","assets"}};
            await handler.getAll(request);

        }
    }
}
