using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace WPS.Models
{
    public static class APIModel
    {
        public static LoginTokenResult GetLoginToken(string username, string password)
        {
            string baseUrl = "https://www.sirajfinancecrm.com/wpsapi";
            string tokenUrl = baseUrl + "/token";
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            //TokenRequestViewModel tokenRequest = new TokenRequestViewModel() { 
            //password=userInfo.Password, username=userInfo.UserName};
            HttpResponseMessage response =
              client.PostAsync(tokenUrl,
                new StringContent(string.Format("grant_type=password&username={0}&password={1}",
                  HttpUtility.UrlEncode(username),
                  HttpUtility.UrlEncode(password)), Encoding.UTF8,
                  "application/x-www-form-urlencoded")).Result;

            string resultJSON = response.Content.ReadAsStringAsync().Result;
            LoginTokenResult result = JsonConvert.DeserializeObject<LoginTokenResult>(resultJSON);

            return result;
        }

        public class LoginTokenResult
        {
            public override string ToString()
            {
                return AccessToken;
            }

            [JsonProperty(PropertyName = "access_token")]
            public string AccessToken { get; set; }

            [JsonProperty(PropertyName = "error")]
            public string Error { get; set; }

            [JsonProperty(PropertyName = "error_description")]
            public string ErrorDescription { get; set; }

        }

        public class JsonCompanySerlization
        {
            [JsonProperty(PropertyName = "statusCode")]
            public int statusCode { get; set; }
            [JsonProperty(PropertyName = "data")]
            public List<APICompany> data { get; set; }
            [JsonProperty(PropertyName = "responseCode")]
            public string responseCode { get; set; }
            [JsonProperty(PropertyName = "message")]
            public string message { get; set; }
        }

        public class APICompany
        {
            [JsonProperty(PropertyName = "id")]
            public int id { get; set; }
            [JsonProperty(PropertyName = "molNo")]
            public string molNo { get; set; }
            [JsonProperty(PropertyName = "licNo")]
            public string licNo { get; set; }
            [JsonProperty(PropertyName = "contactNo")]
            public string contactNo { get; set; }
            [JsonProperty(PropertyName = "email")]
            public string email { get; set; }
            [JsonProperty(PropertyName = "agent")]
            public string agent { get; set; }
            [JsonProperty(PropertyName = "account")]
            public string account { get; set; }
            [JsonProperty(PropertyName = "sifCharges")]
            public decimal sifCharges { get; set; }
            [JsonProperty(PropertyName = "hRnAccounting")]
            public bool hRnAccounting { get; set; }
            [JsonProperty(PropertyName = "wpsLogin")]
            public bool wpsLogin { get; set; }
            [JsonProperty(PropertyName = "wpsUserId")]
            public string wpsUserId { get; set; }
        }
        public static JsonCompanySerlization GetPendingCompany(string token)
        {
            string baseUrl = "https://www.sirajfinancecrm.com/wpsApi/api/v1/entity?pageNumber=1&pageSize=100";
            var authValue = new AuthenticationHeaderValue("Bearer", token);

            var client = new HttpClient()
            {
                DefaultRequestHeaders = { Authorization = authValue }
                //Set some other client defaults like timeout / BaseAddress
            };
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.ConnectionClose = true;

            var message = client.GetAsync(baseUrl).Result;
            if (message.IsSuccessStatusCode)
            {
                var inter = message.Content.ReadAsStringAsync();
                JsonCompanySerlization result = JsonConvert.DeserializeObject<JsonCompanySerlization>(inter.Result);
                return result;
            }
            return null;
        }
    }
}