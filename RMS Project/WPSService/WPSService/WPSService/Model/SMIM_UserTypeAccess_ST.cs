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
    
    public partial class SMIM_UserTypeAccess_ST
    {
        public int AccessId { get; set; }
        public Nullable<int> UserTypeId { get; set; }
        public string AccessType { get; set; }
        public string Description { get; set; }
        public string Allow { get; set; }
        public Nullable<System.Guid> RoleId { get; set; }
    
        public virtual aspnet_Roles aspnet_Roles { get; set; }
        public virtual SMIM_UserType_ST SMIM_UserType_ST { get; set; }
    }
}
