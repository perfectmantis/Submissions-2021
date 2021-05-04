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
    public partial class Products : Form
    {
        public Products()
        {
            InitializeComponent();
        }

        private void Products_Load(object sender, EventArgs e)
        {
            comboBoxproduct.SelectedIndex = 0;
            LoadData();
        }

        private void Addprobtn_Click(object sender, EventArgs e)
        {
            if (IsValid())
            {
                SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
                // SqlDataAdapter sda = new SqlDataAdapter("Select *From [dbo].[Product]", con);
                //Insert Logic
                con.Open();
                bool status = false;
                if (comboBoxproduct.SelectedIndex == 0)
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
                    sqlQuery = @"UPDATE [Product] SET [ProductName] = '" + Productnametxt.Text + "' ,[ProductStatus] = '" + status + "' WHERE [ProductCode] = '" + ProductIdtxt.Text + "'";
                }
                else
                {
                    sqlQuery = @"INSERT INTO [dbo].[Product] ([ProductCode],[ProductName],[ProductStatus]) VALUES
                            ('" + ProductIdtxt.Text + "','" + Productnametxt.Text + "','" + status + "')";
                }
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                cmd.ExecuteNonQuery();
                con.Close();
                LoadData();

                ClearControl();
            }
        }
        private void ClearControl()
        {
            ProductIdtxt.Clear();
            Productnametxt.Clear();
            comboBoxproduct.SelectedIndex = -1;
            Addprobtn.Text = "Add";

            ProductIdtxt.Focus();
        }

        private bool IfProductsExists(SqlConnection con, string productCode)
        {
            SqlDataAdapter sda = new SqlDataAdapter("Select 1 From [Product] WHERE [ProductCode] ='" + productCode +"'", con);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows.Count > 0)
                return true;
            else
                return false;
        }

        public void LoadData()
        {
            SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
            SqlDataAdapter sda = new SqlDataAdapter("Select * From [dbo].[Product]", con);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            dataGridViewstock.Rows.Clear();
            foreach (DataRow item in dt.Rows)
            {
                int n = dataGridViewstock.Rows.Add();
                dataGridViewstock.Rows[n].Cells[0].Value = item["ProductCode"].ToString();
                dataGridViewstock.Rows[n].Cells[1].Value = item["ProductName"].ToString();
                if ((bool)item["ProductStatus"])
                {
                    dataGridViewstock.Rows[n].Cells[2].Value = "Active";
                }
                else
                {
                    dataGridViewstock.Rows[n].Cells[2].Value = "Deactive";
                }
            }
        }

        private void dataGridViewstock_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            Addprobtn.Text = "Update";
            ProductIdtxt.Text = dataGridViewstock.SelectedRows[0].Cells[0].Value.ToString();
            Productnametxt.Text = dataGridViewstock.SelectedRows[0].Cells[1].Value.ToString();
            if (dataGridViewstock.SelectedRows[0].Cells[2].Value.ToString() == "Active")
            {
                comboBoxproduct.SelectedIndex = 0;
            }
            else
            {
                comboBoxproduct.SelectedIndex = 1;
            }
        }

        private void Closebtn_Click(object sender, EventArgs e)
        {
            this.Close();
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
                        sqlQuery = @"DELETE FROM [Product] WHERE [ProductCode] = '" + ProductIdtxt.Text + "'";
                        SqlCommand cmd = new SqlCommand(sqlQuery, con);
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                    else
                    {
                        MessageBox.Show("Record Not Exsists....!");
                    }
                    LoadData();
                    ClearControl();
                }
            }
        }
        private void ResetRecordbtn_Click(object sender, EventArgs e)
        {
            ClearControl();
        }

        private bool IsValid()

        {
            if (ProductIdtxt.Text.Trim() == string.Empty)
            {
                MessageBox.Show("Inter Product ID","Form validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                ProductIdtxt.Focus();
                return false;
            }
            if (Productnametxt.Text.Trim() == string.Empty)
            {
                MessageBox.Show("Inter Product", "Form validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Productnametxt.Focus();
                return false;
            }
            return true;
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
                    comboBoxproduct.Focus();
                }
                else
                {
                    Productnametxt.Focus();
                }
            }
        }

        private void comboBoxproduct_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (comboBoxproduct.SelectedIndex != -1)
                {
                    Addprobtn.Focus();
                }
                else
                {
                    comboBoxproduct.Focus();
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
    }
}
