using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Stock.cs.ReportForm
{
    public partial class ProductsReport : Form
    {
        ReportDocument cryrpt = new ReportDocument();


        public ProductsReport()
        {
            InitializeComponent();
        }
        private void ProductsReport_Load(object sender, EventArgs e)
        {
            cryrpt.Load(@"E:\4th semester\FinalYP\Stock.cs\Stock.cs\Reports\Prodct.rpt");
            SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
            con.Open();
            DataSet dst = new DataSet();
            SqlDataAdapter sda = new SqlDataAdapter("Select * From [Product]", con);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            cryrpt.SetDataSource(dt);
            crystalReportViewer1.ReportSource = cryrpt;

            crystalReportViewer1.RefreshReport();
            
        }

        private void crystalReportViewer1_Load(object sender, EventArgs e)
        {
            
        }
    }
}
