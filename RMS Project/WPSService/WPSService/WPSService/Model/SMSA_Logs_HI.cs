//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WPSService.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class SMSA_Logs_HI
    {
        public long LogId { get; set; }
        public Nullable<int> ColumnId { get; set; }
        public string ActivityType { get; set; }
        public string ActivityDesc { get; set; }
        public Nullable<System.DateTime> ActivityOn { get; set; }
        public Nullable<int> ActivityBy { get; set; }
    }
}
