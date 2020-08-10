using System;
using Xunit;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;

using NeARandFARBackEnd.Assets;

namespace NeARandFARBackEnd.Tests
{
    public class AssetTest
    {
        [Fact]
        public void TestToUpperFunction()
        {

            // Invoke the lambda function and confirm the string was upper cased.
            var assets = new AssetHandler();
            var context = new TestLambdaContext();
            var upperCase = assets.toUpper("hello world", context);

            Assert.Equal("HELLO WORLD", upperCase);
        }

        [Fact]
        public void TestGetAsset() {
            var assets = new AssetHandler();

            AssetRequest request = new AssetRequest();
            request.id = "2";

            var context = new TestLambdaContext();
            string asset = assets.getAsset(request, context);

            Assert.NotEmpty(asset);
        }
    }
}
