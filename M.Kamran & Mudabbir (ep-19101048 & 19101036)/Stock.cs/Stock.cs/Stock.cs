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

namespace Stock.cs
{
    public partial class Stock : Form
    {
      //  private string productCode;

        public Stock()
        {
            InitializeComponent();
        }

        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void Closebtn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Stock_Load(object sender, EventArgs e)
        {
          //  this.ActiveControl = dateTimePicker1;
            comboBoxproductstatus.SelectedIndex = 0;
            LoadData();
        }

        private void dateTimePicker1_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                ProductIdtxt.Focus();
            }
        }

        private void ProductIdtxt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (ProductIdtxt.Text.Length > 0)
                {
                    Productnametxt.Focus();
                }
                else
                {
                    ProductIdtxt.Focus();
                }
            }
        }

        private void Productnametxt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (Productnametxt.Text.Length > 0)
                {
                    Quantitytxt.Focus();
                }
                else
                {
                    Productnametxt.Focus();
                }
            }
        }

        private void Quantitytxt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (Quantitytxt.Text.Length > 0)
                {
                    comboBoxproductstatus.Focus();
                }
                else
                {
                    Quantitytxt.Focus();
                }
            }
        }

        private void comboBoxproductstatus_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (comboBoxproductstatus.SelectedIndex != -1)
                {
                    Deletebtn.Focus();
                }
                else
                {
                    comboBoxproductstatus.Focus();
                }
            }
        }

        private void ProductIdtxt_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsNumber(e.KeyChar) & (Keys)e.KeyChar != Keys.Back & e.KeyChar != '.')
            {
                e.Handled = true;
            }
        }

        private void Quantitytxt_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsNumber(e.KeyChar) & (Keys)e.KeyChar != Keys.Back & e.KeyChar != '.')
            {
                e.Handled = true;
            }
        }       

        private void ResetRecordbtn_Click(object sender, EventArgs e)
        {
            ResetRecords();
        }

        

        private void Addbtn_Click(object sender, EventArgs e)
        {
            if (IsValid())
            {
                SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
                con.Open();
                bool status = false;
                if (comboBoxproductstatus.SelectedIndex == 0)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }

                var sqlQuery = "";
                if (IfProductsExists(con, ProductIdtxt.Text))
                {
                    sqlQuery = @"UPDATE [Stock] SET [ProductName] = '" + Productnametxt.Text + "' ,[Quantity] = '" + Quantitytxt.Text + "',[ProductStatus] = '" + status + "' WHERE [ProductCode] = '" + ProductIdtxt.Text + "'";
                }
                else
                {
                    sqlQuery = @"INSERT INTO [dbo].[Stock] ([ProductCode],[ProductName],[TransectionDate],[Quantity],[ProductStatus]) VALUES
                                ('" + ProductIdtxt.Text + "','" + Productnametxt.Text + "', '" + dateTimePicker1.Value.ToString("MM/dd/yyyy") + "','" + Quantitytxt.Text + "','" + status + "')";
                }
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                cmd.ExecuteNonQuery();
                con.Close();
                MessageBox.Show("Record Saved Seccessully in the System...");
                LoadData();

                ResetRecords();
            }

        }

        private void ResetRecords()
        {
            // dateTimePicker1.Value = DateTime.Now;
            ProductIdtxt.Clear();
            Productnametxt.Clear();
            Quantitytxt.Clear();
            comboBoxproductstatus.SelectedIndex = -1;
            Addbtn.Text = "Add";
            dateTimePicker1.Focus();
        }

        private bool IfProductsExists(SqlConnection con, string productCode)
        {
            // SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
            SqlDataAdapter sda = new SqlDataAdapter("Select 1 From [Stock] WHERE [ProductCode] ='" + productCode + "'", con);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows.Count > 0)
                return true;
            else
                return false;
            //  LoadData();
        }

        public void LoadData()
        {
            SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
            SqlDataAdapter sda = new SqlDataAdapter("Select * From [dbo].[Stock]", con);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            dataGridViewstocklist.Rows.Clear();
            foreach (DataRow item in dt.Rows)
            {
                int n = dataGridViewstocklist.Rows.Add();
                //  dataGridViewstocklist.Rows[n].Cells["dgsno"].Value = n + 1;
                dataGridViewstocklist.Rows[n].Cells["dgprocode"].Value = item["ProductCode"].ToString();
                dataGridViewstocklist.Rows[n].Cells["dgproname"].Value = item["ProductName"].ToString();
                dataGridViewstocklist.Rows[n].Cells["dgqty"].Value = float.Parse(item["Quantity"].ToString());
                dataGridViewstocklist.Rows[n].Cells["dgdate"].Value = Convert.ToDateTime(item["TransectionDate"].ToString()).ToString("dd/MM/yyyy");
                if ((bool)item["ProductStatus"])
                {
                    dataGridViewstocklist.Rows[n].Cells[4].Value = "Active";
                }
                else
                {
                    dataGridViewstocklist.Rows[n].Cells[4].Value = "Deactive";
                }
            }

            if (dataGridViewstocklist.Rows.Count > 0)
            {
                totalprolbl.Text = dataGridViewstocklist.Rows.Count.ToString();
                float totalqty = 0;
                for (int i = 0; i < dataGridViewstocklist.Rows.Count; ++i)
                {
                    totalqty += float.Parse(dataGridViewstocklist.Rows[i].Cells["dgqty"].Value.ToString());
                    totalqtylbl.Text = totalqty.ToString();
                }
            }
            else
            {
                totalprolbl.Text = "0";
                totalqtylbl.Text = "0";
            }
        }

        private void dataGridViewstocklist_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            Addbtn.Text = "Update";
            ProductIdtxt.Text = dataGridViewstocklist.SelectedRows[0].Cells[0].Value.ToString();
            Productnametxt.Text = dataGridViewstocklist.SelectedRows[0].Cells[1].Value.ToString();
            Quantitytxt.Text = dataGridViewstocklist.SelectedRows[0].Cells[2].Value.ToString();
            dateTimePicker1.Text = DateTime.Parse(dataGridViewstocklist.SelectedRows[0].Cells["dgdate"].Value.ToString()).ToString("dd/MM/yyyy");
            if (dataGridViewstocklist.SelectedRows[0].Cells[3].Value.ToString() == "Active")
            {
                comboBoxproductstatus.SelectedIndex = 0;
            }
            else
            {
                comboBoxproductstatus.SelectedIndex = 1;
            }
        }

        private bool IsValid()
        {
            {
                if (ProductIdtxt.Text.Trim() == string.Empty)
                {
                    MessageBox.Show("Inter Product ID", "Form validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    ProductIdtxt.Focus();
                    return false;
                }
                if (Productnametxt.Text.Trim() == string.Empty)
                {
                    MessageBox.Show("Inter Product", "Form validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    Productnametxt.Focus();
                    return false;
                }
                if (Quantitytxt.Text.Trim() == string.Empty)
                {
                    MessageBox.Show("Inter Product Qty", "Form validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    Quantitytxt.Focus();
                    return false;
                }
                return true;
            }

        }

        private void Deletebtn_Click(object sender, EventArgs e)
        {
            if (IsValid())
            {
                DialogResult dr = MessageBox.Show("Are You Sure you want to delete this resord", "Message", MessageBoxButtons.YesNo);
                if (dr == DialogResult.Yes)
                {
                    SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
                    var sqlQuery = "";
                    if (IfProductsExists(con, ProductIdtxt.Text))
                    {
                        con.Open();
                        sqlQuery = @"DELETE FROM [Stock] WHERE [ProductCode] = '" + ProductIdtxt.Text + "'";
                        SqlCommand cmd = new SqlCommand(sqlQuery, con);
                        cmd.ExecuteNonQuery();
                        con.Close();
                        MessageBox.Show("Record Deleted Seccessfully!");
                    }
                    else
                    {
                        MessageBox.Show("Record Not Exsists....!");
                    }
                    LoadData();
                    ResetRecords();
                }
            }
        }

        private void ProductIdtxt_TextChanged(object sender, EventArgs e)
        {
           
        }

        internal class cs
        {

        }
    }
    
}
