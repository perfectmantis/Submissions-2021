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
    
    public partial class SMIM_UserMst_ST
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SMIM_UserMst_ST()
        {
            this.SMIM_UserAccess_ST = new HashSet<SMIM_UserAccess_ST>();
        }
    
        public int UserId { get; set; }
        public Nullable<int> UserTypeId { get; set; }
        public Nullable<int> OrgId { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public string UserName { get; set; }
        public Nullable<int> Salutation { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string ZipCode { get; set; }
        public Nullable<System.DateTime> LoginDate { get; set; }
        public Nullable<System.DateTime> CreateOn { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> SACId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SMIM_UserAccess_ST> SMIM_UserAccess_ST { get; set; }
        public virtual SMIM_UserType_ST SMIM_UserType_ST { get; set; }
        public virtual SMSA_CompanyMst_ST SMSA_CompanyMst_ST { get; set; }
        public virtual SMSA_Organization_ST SMSA_Organization_ST { get; set; }
        public virtual SRCC_SalesAccount_ST SRCC_SalesAccount_ST { get; set; }
    }
}
