using System.Collections.Generic;
using System.Text.Json;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

namespace NeARandFARBackEnd
{
    public class RequestUtil
    {
        public Dictionary<string, string> checkRequest(APIGatewayProxyRequest request, string[] values) {

            LambdaLogger.Log(System.Text.Json.JsonSerializer.Serialize(request, typeof(APIGatewayProxyRequest)).ToString());

            Dictionary<string, string> result = new Dictionary<string, string>();
            Dictionary<string, string> body = new Dictionary<string, string>();
            if(request.Body != null) {
                body = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(request.Body);
            }
            
            foreach(string val in values) {
                LambdaLogger.Log($"looking for parameter {val}");

                if(request.QueryStringParameters != null && request.QueryStringParameters[val] != null) {
                    result[val] = request.QueryStringParameters[val];

                } else if(request.PathParameters != null && request.PathParameters[val] != null) {
                    result[val] = request.PathParameters[val];
                
                } else if (request.Body != null && body.ContainsKey(val) && body[val] != null) {
                    result[val] = body[val];
                }
            }
            
            return result;
        }
    }
}