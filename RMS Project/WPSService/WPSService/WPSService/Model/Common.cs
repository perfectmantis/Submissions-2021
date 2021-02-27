using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WPSService.Model
{
    public class Common
    {
         
    }

    public class ReviewCollection 
    {
        public List<SMAM_ReviewSites_ST> Reviewsites { get; set; }
        public List<ReviewAccountSite> ReviewActsites { get; set; }

    }

    public class ReviewAccountSite
    {
        public int AccountSiteID { get; set; }
        public Nullable<int> AccountID { get; set; }
        public Nullable<int> ReviewSiteID { get; set; }
        public string ReviewURL { get; set; }
        public Nullable<bool> IsActive { get; set; }
    }

    public class SMIM_ReviewAccountName_ST
    {
        public int AccountID { get; set; }
        public int BenchmarkID { get; set; }
        public string AccountName { get; set; }
        public Nullable<bool> IsBenchmarkAccount { get; set; }
    }

    public class SMIM_BenchAccountName_ST
    {
        public int BenchmarkID { get; set; }
        public string AccountName { get; set; }
        public Nullable<bool> IsBenchmarkAccount { get; set; }
    }

        //public int AccountSiteID { get; set; }
        //public int? AccountID { get; set; }
        //public int? ReviewSiteID { get; set; }
        //public string ReviewURL { get; set; }
        //public bool? IsActive { get; set; }
        //public int SiteID { get; set; }
        //public string SiteName { get; set; }
        //public string ShortName { get; set; }


}