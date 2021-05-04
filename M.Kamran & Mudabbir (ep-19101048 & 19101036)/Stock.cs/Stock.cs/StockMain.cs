using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Stock.cs
{
    public partial class StockMain : Form
    {

        public StockMain()
        {
            InitializeComponent();
        }

        private void productsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Products pf = new Products();
            pf.MdiParent = this;
            pf.Show();
        }
        bool close = true;
        private void StockMain_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (close)
            {
                DialogResult dr = MessageBox.Show("Are You Sure you want to Exit APP.", "Message", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                if (dr == DialogResult.Yes)
                {
                    close = false;
                    Application.Exit();
                }
                else
                {
                    e.Cancel = true;
                }
            }
        }

        private void stockToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stock stk = new Stock();
            stk.MdiParent = this;
            stk.Show();
        }

        private void productListToolStripMenuItem_Click(object sender, EventArgs e)
        {
           // ReportForm.ProductsReport prod = new ReportForm.ProductsReport();
            ReportForm.ProductsReport pro = new ReportForm.ProductsReport();
            {
                pro.MdiParent = this;
                pro.Show();
            }
            
        }

        private void stockListToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ReportForm.StockReport pro = new ReportForm.StockReport();
            {
                pro.MdiParent = this;
                pro.Show();
            }
        }
    }
}
