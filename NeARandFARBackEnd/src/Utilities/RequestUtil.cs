using System.Collections.Generic;
using Amazon.Lambda.APIGatewayEvents;

namespace NeARandFARBackEnd
{
    public class RequestUtil
    {
        public Dictionary<string, string> checkRequest(APIGatewayProxyRequest request, string[] values) {

            Dictionary<string, string> result = new Dictionary<string, string>();
            
            foreach(string val in values) {
                if(request.QueryStringParameters != null && request.QueryStringParameters["collection"] != null) {
                    result[val] = request.QueryStringParameters["collection"];

                } else if(request.PathParameters != null && request.PathParameters["collection"] != null) {
                    result[val] = request.PathParameters["collection"];
                
                } else if (request.Body != null) {
                    Dictionary<string, string> body = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(request.Body);
                    if(body["collection"] != null) {
                        result[val] = body["collection"];
                    }
                }
            }
            
            return result;
        }
    }
}