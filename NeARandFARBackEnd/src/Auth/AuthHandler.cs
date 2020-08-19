using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;

namespace NeARandFARBackEnd.Auth
{
    public class AuthRequest
    {
        public string username {get; set;}
        public string password {get; set;}
        public string token {get; set;}
    }

    // public class AuthResponse
    // {
    //     public string body {get; set;}
    //     public Dictionary<string, string> headers {get; set;}

    //     public int StatusCode {get; set;}

    //     public AuthResponse(string token) {
    //         Console.WriteLine(token);
    //         body = token;
    //         StatusCode = (int)HttpStatusCode.OK;
    //         headers = new Dictionary<string, string> {
    //             {"Access-Control-Allow-Origin", "*"}
    //         };
    //     }

    // }


    public class AuthHandler
    {
        NeARandFARBackEnd.RequestUtil requestUtil;

        public AuthHandler() {
             requestUtil = new NeARandFARBackEnd.RequestUtil();
        }

        // TODO: Maybe make some real authorization?

        public async Task<object> token(APIGatewayProxyRequest request, ILambdaContext context = null) {
            string token = null;

            Dictionary<string, string> checkedRequest = requestUtil.checkRequest(request, new string[]{"username", "password", "token"});

            if(checkedRequest["username"] != null && checkedRequest["password"] != null || checkedRequest["token"] != null ) {
                token = Environment.GetEnvironmentVariable("apiKey");
                // token ="token";
            }

            return new APIGatewayProxyResponse {
                StatusCode = (int)HttpStatusCode.OK,
                Headers = new Dictionary<string, string> {{"Access-Control-Allow-Origin", "*"}},
                Body = token
            };
            

            // return null;
        }
    }
}