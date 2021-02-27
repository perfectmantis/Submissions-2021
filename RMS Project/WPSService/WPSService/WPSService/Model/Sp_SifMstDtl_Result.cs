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
    
    public partial class Sp_SifMstDtl_Result
    {
        public int SifDtlId { get; set; }
        public Nullable<int> SifId { get; set; }
        public Nullable<int> CompanyID { get; set; }
        public Nullable<int> EmpId { get; set; }
        public Nullable<int> BankId { get; set; }
        public Nullable<System.DateTime> SifDate { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public string FileName { get; set; }
        public Nullable<int> TotalEmployees { get; set; }
        public string EstId { get; set; }
        public string CompanyName { get; set; }
        public string PersonalNo { get; set; }
        public string FullName { get; set; }
        public string BankName { get; set; }
        public string RoutingCode { get; set; }
        public string IBAN { get; set; }
        public Nullable<decimal> Basic { get; set; }
        public Nullable<decimal> Allowances { get; set; }
        public Nullable<decimal> NetSalary { get; set; }
        public Nullable<int> LeavesPeriod { get; set; }
        public Nullable<decimal> TotalSalary { get; set; }
        public string WPSRefNo { get; set; }
        public string WPSDepositSlip { get; set; }
        public string ChargesRefNo { get; set; }
        public string ChargesDepositSlip { get; set; }
        public string ProcessType { get; set; }
        public string Reason { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public bool SND_CBUAE { get; set; }
        public Nullable<System.DateTime> SND_CBUAE_DATE { get; set; }
        public string ACK_NAK { get; set; }
        public Nullable<System.DateTime> ACT_NAK_DATE { get; set; }
        public Nullable<int> DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedOn { get; set; }
        public string DeleteRemarks { get; set; }
    }
}
