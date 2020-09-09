using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.Extensions.Configuration;

using Xunit;
using Xunit.Abstractions;

using Amazon.Lambda.TestUtilities;
using Amazon.Lambda.APIGatewayEvents;

using NeARandFARBackEnd.Entities;

namespace NeARandFARBackEnd.Tests
{

    public class EntityTest : IClassFixture<LaunchSettingsFixture>
    {
        private ITestOutputHelper output;
        LaunchSettingsFixture fixture;
        public EntityTest(ITestOutputHelper output, LaunchSettingsFixture fixture) {
            this.output = output;
            this.fixture = fixture;
        }

        private void readConfig() {
            IConfiguration config;
            
            string configFile = "config.json";

            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(configFile);

            config = new ConfigurationBuilder()
                .AddJsonFile(configFile, true, true)
                .Build();

            output.WriteLine("Setting environment variables");
            foreach(var c in config.AsEnumerable()) {
                output.WriteLine($"{c.Key}: {c.Value}");
                Environment.SetEnvironmentVariable(c.Key, c.Value);
            }
        }

        [Fact]
        public async void testGetEntity() {
            var entities = new EntityHandler();

            APIGatewayProxyRequest request = new APIGatewayProxyRequest();
            request.PathParameters = new Dictionary<string, string>() {
                { "id", "10001" } 
            };

            // TODO: Assert effect of not setting needed properties on request
            var context = new TestLambdaContext();
            object entity = await entities.getEntityByID(request, context);

            Assert.NotNull(entity.ToString());
        }

        [Fact]
        public async void testGetAllEntities() {
            var handler = new EntityHandler();

            APIGatewayProxyRequest request = new APIGatewayProxyRequest();

            object result = await handler.getEntities(request);

            // TODO: Better assertion
            Assert.NotEmpty(result.ToString());
        }

        [Fact]
        public async void testGetMultipleEntities()
        {
            var handler = new EntityHandler();

            APIGatewayProxyRequest request = new APIGatewayProxyRequest();
            request.Body = "{ 'position.lat': { $gt: 59.29}}";

            object result = await handler.getEntities(request);
            
            // TODO: Better assertion
            Assert.NotEmpty(result.ToString());
        }
    }
}
