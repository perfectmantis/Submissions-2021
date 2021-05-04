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
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();
        }
        bool close = true;
        private void exitbtn_Click(object sender, EventArgs e)
        {
            //add new condition in close button...
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
                    close = true;
                }
            }
        }

        private void Clearbtn_Click(object sender, EventArgs e)
        {
            usernametxt.Clear();
            passwordtxt.Clear();

            usernametxt.Focus();
        }

        private void loginbtn_Click(object sender, EventArgs e)
        {
            if (IsValid())
            {

                SqlConnection con = new SqlConnection("Data Source=KAMRAN-PC\\SQLEXPRESS;Initial Catalog=POSStock;Integrated Security=True");
                SqlDataAdapter sda = new SqlDataAdapter(@"SELECT [UserName] ,[Password]
                      FROM [dbo].[Login] where UserName = '" + usernametxt.Text + "' and Password = '" + passwordtxt.Text + "'", con);
                con.Open();
                DataTable dt = new DataTable();
                sda.Fill(dt);
                    if (dt.Rows.Count == 1)              
                {
                    this.Hide();
                    StockMain sk = new StockMain();
                    sk.Show();
                }
                else
                {
                    MessageBox.Show("User name or password is incorrect", "Login Failed", MessageBoxButtons.OK, MessageBoxIcon.Error);
                   // Clearbtn_Click(sender, e);
                }
            }        
        }

        private bool IsValid()

        {
            if (usernametxt.Text.Trim() == string.Empty)
            {
                MessageBox.Show("Username is required", "Form validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                usernametxt.Focus();
                return false;
            }
            if (passwordtxt.Text.Trim() == string.Empty)
            {
                MessageBox.Show("Password is required", "Form validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                passwordtxt.Focus();
                return false;
            }

            return true;
        }
    }
}
