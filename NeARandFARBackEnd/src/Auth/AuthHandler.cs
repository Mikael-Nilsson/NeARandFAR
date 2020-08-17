using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeARandFARBackEnd.Auth
{
    public class AuthRequest
    {
        public string username {get; set;}
        public string password {get; set;}
        public string token {get; set;}
    }

    public class AuthResponse
    {
        public string body {get; set;}
        public Dictionary<string, string> headers {get; set;}

        public AuthResponse(string token) {
            Console.WriteLine(token);
            body = token;
            headers = null;
        }
    }


    public class AuthHandler
    {
        NeARandFARBackEnd.RequestUtil requestUtil;

        public AuthHandler() {
             requestUtil = new NeARandFARBackEnd.RequestUtil();
        }


        // TODO: Maybe make some real authorization?

        public async Task<object> token(APIGatewayProxyRequest request, ILambdaContext context = null) {
            // string token = null;

            // Dictionary<string ,string> params = requestUtil.checkRequest(request, new string[]{"username", "password", "token"});

            // if(params["username"] != null && params["password"] != null || params["token"] != null ) {
            //     token ="token";
            // }

            // return new AuthResponse(token);

            return null;
        }
    }
}