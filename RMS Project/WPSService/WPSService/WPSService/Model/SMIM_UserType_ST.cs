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
    
    public partial class SMIM_UserType_ST
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SMIM_UserType_ST()
        {
            this.SMIM_UserAccess_ST = new HashSet<SMIM_UserAccess_ST>();
            this.SMIM_UserMst_ST = new HashSet<SMIM_UserMst_ST>();
            this.SMIM_UserTypeAccess_ST = new HashSet<SMIM_UserTypeAccess_ST>();
        }
    
        public int UserTypeId { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SMIM_UserAccess_ST> SMIM_UserAccess_ST { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SMIM_UserMst_ST> SMIM_UserMst_ST { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SMIM_UserTypeAccess_ST> SMIM_UserTypeAccess_ST { get; set; }
    }
}
