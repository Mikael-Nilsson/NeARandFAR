using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.Extensions.Configuration;

using Xunit;
using Xunit.Abstractions;

using Amazon.Lambda.TestUtilities;
using Amazon.Lambda.APIGatewayEvents;

using NeARandFARBackEnd.Assets;

namespace NeARandFARBackEnd.Tests
{

    public class AssetTest : IClassFixture<LaunchSettingsFixture>
    {
        private ITestOutputHelper output;
        LaunchSettingsFixture fixture;
        public AssetTest(ITestOutputHelper output, LaunchSettingsFixture fixture) {
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
        public void TestGetAsset() {
            var assets = new AssetHandler();

            AssetRequest request = new AssetRequest();
            request.id = "2";
            
            // TODO: Assert effect of not setting needed properties on request
            var context = new TestLambdaContext();
            object asset = assets.getAsset(request, context);

            Assert.NotEmpty(asset.ToString());
        }

        [Fact]
        public async void TestGetAssets() {
            var handler = new AssetHandler();

            APIGatewayProxyRequest request = new APIGatewayProxyRequest();

            object result = await handler.getAssets(request);

            // TODO: Better assertion
            Assert.NotEmpty(result.ToString());


        }
    }
}
