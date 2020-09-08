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
    public class AuthTest : IClassFixture<LaunchSettingsFixture>
    {
        private ITestOutputHelper output;
        LaunchSettingsFixture fixture;

        public AuthTest(ITestOutputHelper output, LaunchSettingsFixture fixture) {
            this.output = output;
            this.fixture = fixture;
        }

        [Fact]
        public async void testSimpleAuth() {
            Auth.AuthHandler handler = new Auth.AuthHandler();

            APIGatewayProxyRequest request = new APIGatewayProxyRequest();
            request.Body = "{ \"username\": \"e\", \"password\": \"ed\" }";

            var result = handler.token(request);

        }
    }
}