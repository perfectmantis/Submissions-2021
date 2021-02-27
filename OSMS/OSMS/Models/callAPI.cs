using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace OSMS.Models
{
    public class callAPI
    {
        HttpClient client = new HttpClient();
        string baseUrl = "http://localhost:21686/";

        public List<T> GetEntityList<T>(string url)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync(url).Result;
            if (response.IsSuccessStatusCode)
                return response.Content.ReadAsAsync<List<T>>().Result;
            return null;
        }

        public T GetEntityById<T>(string url, string Id)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync(url + Id).Result;
            if (response.IsSuccessStatusCode)
                return response.Content.ReadAsAsync<T>().Result;
            return default(T);            
        }

        public List<T> GetEntityListById<T>(string url, Int64 Id)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync(url + Id).Result;
            if (response.IsSuccessStatusCode)
                return response.Content.ReadAsAsync<List<T>>().Result;
            return null;
        }

        public T InsertUpdateEntity2<T>(string url, T entity)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            HttpResponseMessage response = client.PostAsJsonAsync(url, entity).Result;
            if (response.IsSuccessStatusCode)
                return response.Content.ReadAsAsync<T>().Result;
            return entity;
        }
        public int InsertUpdateEntity<T>(string url, T entity)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            HttpResponseMessage response = client.PostAsJsonAsync(url, entity).Result;
            if (response.IsSuccessStatusCode)
                return response.Content.ReadAsAsync<Int32>().Result;
            return 0;
        }

        public bool DeleteEntity(string url, Int32 Id)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            HttpResponseMessage response = client.DeleteAsync(url + Id).Result;
            return response.IsSuccessStatusCode;
        }

        public string UpdateEntity<T>(string url, int UserId, string SecondvariableName, string p1, string ThirdvariableName, string p2)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            HttpResponseMessage response = client.GetAsync(url + UserId + "&" + SecondvariableName + p1 + "&" + ThirdvariableName + p2).Result;
            if (response.IsSuccessStatusCode)
                return response.Content.ReadAsAsync<string>().Result;
            return "Request Failed";
        }
    }
}