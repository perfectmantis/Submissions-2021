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
    
    public partial class SMSA_States_ST
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SMSA_States_ST()
        {
            this.SMSA_Areas_ST = new HashSet<SMSA_Areas_ST>();
            this.SMSA_City_ST = new HashSet<SMSA_City_ST>();
        }
    
        public int StateID { get; set; }
        public string Title { get; set; }
        public string StateName { get; set; }
        public Nullable<int> CountryID { get; set; }
        public Nullable<int> CreateBy { get; set; }
        public Nullable<System.DateTime> CreateOn { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SMSA_Areas_ST> SMSA_Areas_ST { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SMSA_City_ST> SMSA_City_ST { get; set; }
        public virtual SMSA_Country_ST SMSA_Country_ST { get; set; }
    }
}