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
    public partial class StockReport : Form
    {
        ReportDocument crystal = new ReportDocument();

        public StockReport()
        {
            InitializeComponent();
        }
        DataSet dst = new DataSet();
        private void StockReport_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            crystal.Load(@"E:\4th semester\FinalYP\Stock.cs\Stock.cs\Reports\Stockrpt.rpt");
            SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
            con.Open();
            
            SqlDataAdapter sda = new SqlDataAdapter("Select * From [Stock] where Cast(TransectionDate as Date) between '" + dateTimePicker1.Value.ToString("MM/dd/yyyy") + "' and '" + dateTimePicker2.Value.ToString("MM/dd/yyyy") + "'", con);
           // DataTable st = new DataTable();
            sda.Fill(dst, "Stock");
            crystal.SetDataSource(dst);
            crystal.SetParameterValue("@FromDate",dateTimePicker1.Value.ToString("dd/MM/yyyy"));
            crystal.SetParameterValue("@ToDate", dateTimePicker2.Value.ToString("dd/MM/yyyy"));
            crystalReportViewer2.ReportSource = crystal;
            
            crystalReportViewer2.Refresh();
        }

        private void Exportbtn_Click(object sender, EventArgs e)
        {
            ExportOptions exportOption;
            DiskFileDestinationOptions diskFileDestinationOption = new DiskFileDestinationOptions();
            SaveFileDialog sfd = new SaveFileDialog();
         //   sfd.Filter = "Pdf Files|*.pdf";
            sfd.Filter = "Excel|*.xls";
            if(sfd.ShowDialog() == DialogResult.OK)
            {
                diskFileDestinationOption.DiskFileName = sfd.FileName;
            }
            exportOption = crystal.ExportOptions;
            {
                exportOption.ExportDestinationType = ExportDestinationType.DiskFile;
               // exportOption.ExportFormatType = ExportFormatType.PortableDocFormat;
                exportOption.ExportFormatType = ExportFormatType.Excel;
                exportOption.ExportDestinationOptions = diskFileDestinationOption;
              //  exportOption.ExportFormatOptions = new PdfRtfWordFormatOptions();
                exportOption.ExportFormatOptions = new ExcelFormatOptions();
            }
            crystal.Export();
        }
    }
}
