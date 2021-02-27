using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace WPS.Models
{
    public class UsersClient
    {
        UsersView uv = new UsersView();
        private string _BaseURL = "http://localhost:59292/api/";

        //#region Bank Client
        //public SMSA_Country_ST find(string url, decimal id)
        //{
        //    try
        //    {
        //        uv.client.BaseAddress = new Uri(uv._BaseURL);
        //        uv.client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //        HttpResponseMessage response = uv.client.GetAsync(url + id).Result;

        //        if (response.IsSuccessStatusCode)
        //            return response.Content.ReadAsAsync<SMSA_Country_ST>().Result;
        //        return null;
        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}
        //public bool Create(string url, SMSA_Country_ST country)
        //{
        //    try
        //    {
        //        uv.client.BaseAddress = new Uri(uv._BaseURL);
        //        uv.client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
        //        HttpResponseMessage response = uv.client.PostAsJsonAsync(url, country).Result;
        //        return response.IsSuccessStatusCode;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
        //public bool Edit(string url, SMSA_Country_ST country)
        //{
        //    try
        //    {
        //        uv.client.BaseAddress = new Uri(uv._BaseURL);
        //        uv.client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
        //        HttpResponseMessage response = uv.client.PostAsJsonAsync(url + country.CountryID, country).Result;
        //        return response.IsSuccessStatusCode;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
        //public bool Delete(string url, decimal id)
        //{
        //    try
        //    {
        //        uv.client.BaseAddress = new Uri(uv._BaseURL);
        //        uv.client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
        //        HttpResponseMessage response = uv.client.DeleteAsync(url + id).Result;
        //        return response.IsSuccessStatusCode;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
        //#endregion
    }
}