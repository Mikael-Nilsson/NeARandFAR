using System;
using System.IO;
using System.Collections;
using Microsoft.Extensions.Configuration;

using Xunit;
using Xunit.Abstractions;

namespace NeARandFARBackEnd.Tests
{
    public class LaunchSettingsFixture : IDisposable
    {

        public LaunchSettingsFixture() {
            
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("config.json", true, true)
                .Build();

            foreach(var c in config.AsEnumerable()) {
                string s = $"{c.Key} : {c.Value}";
                Environment.SetEnvironmentVariable(c.Key, c.Value);
            }
        }

        public void Dispose()
        {
            // ... clean up
        }
    }
}