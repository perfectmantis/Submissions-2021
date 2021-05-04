namespace Stock.cs
{
    partial class Products
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Products));
            this.Addprobtn = new System.Windows.Forms.Button();
            this.Deletebtn = new System.Windows.Forms.Button();
            this.comboBoxproduct = new System.Windows.Forms.ComboBox();
            this.ProductIdtxt = new System.Windows.Forms.TextBox();
            this.Productnametxt = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.dataGridViewstock = new System.Windows.Forms.DataGridView();
            this.Column1 = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Column2 = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Column3 = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.label3 = new System.Windows.Forms.Label();
            this.Closebtn = new System.Windows.Forms.Button();
            this.ResetRecordbtn = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewstock)).BeginInit();
            this.SuspendLayout();
            // 
            // Addprobtn
            // 
            this.Addprobtn.BackColor = System.Drawing.Color.DarkOliveGreen;
            this.Addprobtn.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.Addprobtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Addprobtn.ForeColor = System.Drawing.Color.White;
            this.Addprobtn.Location = new System.Drawing.Point(572, 99);
            this.Addprobtn.Name = "Addprobtn";
            this.Addprobtn.Size = new System.Drawing.Size(86, 39);
            this.Addprobtn.TabIndex = 4;
            this.Addprobtn.Text = "Add";
            this.Addprobtn.UseVisualStyleBackColor = false;
            this.Addprobtn.Click += new System.EventHandler(this.Addprobtn_Click);
            // 
            // Deletebtn
            // 
            this.Deletebtn.BackColor = System.Drawing.Color.DarkOliveGreen;
            this.Deletebtn.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.Deletebtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Deletebtn.ForeColor = System.Drawing.Color.White;
            this.Deletebtn.Location = new System.Drawing.Point(664, 99);
            this.Deletebtn.Name = "Deletebtn";
            this.Deletebtn.Size = new System.Drawing.Size(88, 39);
            this.Deletebtn.TabIndex = 5;
            this.Deletebtn.Text = "Delete";
            this.Deletebtn.UseVisualStyleBackColor = false;
            this.Deletebtn.Click += new System.EventHandler(this.Deletebtn_Click);
            // 
            // comboBoxproduct
            // 
            this.comboBoxproduct.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxproduct.Font = new System.Drawing.Font("Microsoft Sans Serif", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.comboBoxproduct.FormattingEnabled = true;
            this.comboBoxproduct.Items.AddRange(new object[] {
            "Active",
            "Deactive"});
            this.comboBoxproduct.Location = new System.Drawing.Point(364, 106);
            this.comboBoxproduct.Name = "comboBoxproduct";
            this.comboBoxproduct.Size = new System.Drawing.Size(166, 26);
            this.comboBoxproduct.TabIndex = 3;
            this.comboBoxproduct.KeyDown += new System.Windows.Forms.KeyEventHandler(this.comboBoxproduct_KeyDown);
            // 
            // ProductIdtxt
            // 
            this.ProductIdtxt.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ProductIdtxt.Location = new System.Drawing.Point(26, 106);
            this.ProductIdtxt.Name = "ProductIdtxt";
            this.ProductIdtxt.Size = new System.Drawing.Size(110, 26);
            this.ProductIdtxt.TabIndex = 0;
            this.ProductIdtxt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.ProductIdtxt_KeyDown);
            this.ProductIdtxt.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.ProductIdtxt_KeyPress);
            // 
            // Productnametxt
            // 
            this.Productnametxt.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Productnametxt.Location = new System.Drawing.Point(153, 106);
            this.Productnametxt.Name = "Productnametxt";
            this.Productnametxt.Size = new System.Drawing.Size(190, 26);
            this.Productnametxt.TabIndex = 1;
            this.Productnametxt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Productnametxt_KeyDown);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(23, 75);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(74, 17);
            this.label1.TabIndex = 6;
            this.label1.Text = "Product ID";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(150, 75);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(98, 17);
            this.label2.TabIndex = 7;
            this.label2.Text = "Product Name";
            // 
            // dataGridViewstock
            // 
            this.dataGridViewstock.AllowUserToAddRows = false;
            this.dataGridViewstock.AllowUserToDeleteRows = false;
            this.dataGridViewstock.AllowUserToResizeColumns = false;
            this.dataGridViewstock.AllowUserToResizeRows = false;
            this.dataGridViewstock.BackgroundColor = System.Drawing.Color.WhiteSmoke;
            this.dataGridViewstock.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.dataGridViewstock.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.Single;
            this.dataGridViewstock.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            this.dataGridViewstock.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.Column1,
            this.Column2,
            this.Column3});
            this.dataGridViewstock.Location = new System.Drawing.Point(26, 170);
            this.dataGridViewstock.Name = "dataGridViewstock";
            this.dataGridViewstock.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.AutoSizeToFirstHeader;
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.TopCenter;
            this.dataGridViewstock.RowsDefaultCellStyle = dataGridViewCellStyle1;
            this.dataGridViewstock.ScrollBars = System.Windows.Forms.ScrollBars.Horizontal;
            this.dataGridViewstock.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataGridViewstock.Size = new System.Drawing.Size(817, 253);
            this.dataGridViewstock.TabIndex = 8;
            this.dataGridViewstock.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.dataGridViewstock_MouseDoubleClick);
            // 
            // Column1
            // 
            this.Column1.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.None;
            this.Column1.HeaderText = "Product ID";
            this.Column1.Name = "Column1";
            this.Column1.Width = 259;
            // 
            // Column2
            // 
            this.Column2.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.Column2.HeaderText = "Product Name";
            this.Column2.Name = "Column2";
            // 
            // Column3
            // 
            this.Column3.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.Column3.HeaderText = "Status";
            this.Column3.Name = "Column3";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Book Antiqua", 16F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Underline))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.ForeColor = System.Drawing.Color.DarkOliveGreen;
            this.label3.Location = new System.Drawing.Point(379, 20);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(138, 27);
            this.label3.TabIndex = 9;
            this.label3.Text = "PRODUCTS";
            // 
            // Closebtn
            // 
            this.Closebtn.BackColor = System.Drawing.Color.Transparent;
            this.Closebtn.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("Closebtn.BackgroundImage")));
            this.Closebtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.Closebtn.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.Closebtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Closebtn.Location = new System.Drawing.Point(837, 12);
            this.Closebtn.Name = "Closebtn";
            this.Closebtn.Size = new System.Drawing.Size(31, 26);
            this.Closebtn.TabIndex = 10;
            this.Closebtn.UseVisualStyleBackColor = false;
            this.Closebtn.Click += new System.EventHandler(this.Closebtn_Click);
            // 
            // ResetRecordbtn
            // 
            this.ResetRecordbtn.BackColor = System.Drawing.Color.DarkOliveGreen;
            this.ResetRecordbtn.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.ResetRecordbtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ResetRecordbtn.ForeColor = System.Drawing.Color.White;
            this.ResetRecordbtn.Location = new System.Drawing.Point(758, 99);
            this.ResetRecordbtn.Name = "ResetRecordbtn";
            this.ResetRecordbtn.Size = new System.Drawing.Size(62, 39);
            this.ResetRecordbtn.TabIndex = 11;
            this.ResetRecordbtn.Text = "Reset";
            this.ResetRecordbtn.UseVisualStyleBackColor = false;
            this.ResetRecordbtn.Click += new System.EventHandler(this.ResetRecordbtn_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(363, 75);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(48, 17);
            this.label4.TabIndex = 12;
            this.label4.Text = "Status";
            // 
            // Products
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(880, 502);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.ResetRecordbtn);
            this.Controls.Add(this.Closebtn);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.dataGridViewstock);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.Productnametxt);
            this.Controls.Add(this.comboBoxproduct);
            this.Controls.Add(this.ProductIdtxt);
            this.Controls.Add(this.Deletebtn);
            this.Controls.Add(this.Addprobtn);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Products";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Products";
            this.Load += new System.EventHandler(this.Products_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewstock)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button Addprobtn;
        private System.Windows.Forms.Button Deletebtn;
        private System.Windows.Forms.ComboBox comboBoxproduct;
        private System.Windows.Forms.TextBox ProductIdtxt;
        private System.Windows.Forms.TextBox Productnametxt;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.DataGridView dataGridViewstock;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button Closebtn;
        private System.Windows.Forms.Button ResetRecordbtn;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.DataGridViewTextBoxColumn Column1;
        private System.Windows.Forms.DataGridViewTextBoxColumn Column2;
        private System.Windows.Forms.DataGridViewTextBoxColumn Column3;
    }
}