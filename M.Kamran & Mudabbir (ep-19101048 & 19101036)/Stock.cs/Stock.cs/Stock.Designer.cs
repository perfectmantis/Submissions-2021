namespace Stock.cs
{
    partial class Stock
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Stock));
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.Productnametxt = new System.Windows.Forms.TextBox();
            this.comboBoxproductstatus = new System.Windows.Forms.ComboBox();
            this.ProductIdtxt = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.Quantitytxt = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.ResetRecordbtn = new System.Windows.Forms.Button();
            this.Deletebtn = new System.Windows.Forms.Button();
            this.Addbtn = new System.Windows.Forms.Button();
            this.dataGridViewstocklist = new System.Windows.Forms.DataGridView();
            this.dgprocode = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.dgproname = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.dgqty = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.dgdate = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.dgstatus = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.Closebtn = new System.Windows.Forms.Button();
            this.totalprolbl = new System.Windows.Forms.Label();
            this.totalqtylbl = new System.Windows.Forms.Label();
            this.dateTimePicker1 = new System.Windows.Forms.DateTimePicker();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewstocklist)).BeginInit();
            this.SuspendLayout();
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(298, 80);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(98, 17);
            this.label2.TabIndex = 12;
            this.label2.Text = "Product Name";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(154, 80);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(74, 17);
            this.label1.TabIndex = 11;
            this.label1.Text = "Product ID";
            // 
            // Productnametxt
            // 
            this.Productnametxt.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Productnametxt.Location = new System.Drawing.Point(296, 108);
            this.Productnametxt.Name = "Productnametxt";
            this.Productnametxt.Size = new System.Drawing.Size(168, 26);
            this.Productnametxt.TabIndex = 2;
            this.Productnametxt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Productnametxt_KeyDown);
            // 
            // comboBoxproductstatus
            // 
            this.comboBoxproductstatus.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxproductstatus.Font = new System.Drawing.Font("Microsoft Sans Serif", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.comboBoxproductstatus.FormattingEnabled = true;
            this.comboBoxproductstatus.Items.AddRange(new object[] {
            "Active",
            "Deactive"});
            this.comboBoxproductstatus.Location = new System.Drawing.Point(676, 108);
            this.comboBoxproductstatus.Name = "comboBoxproductstatus";
            this.comboBoxproductstatus.Size = new System.Drawing.Size(166, 26);
            this.comboBoxproductstatus.TabIndex = 4;
            this.comboBoxproductstatus.KeyDown += new System.Windows.Forms.KeyEventHandler(this.comboBoxproductstatus_KeyDown);
            // 
            // ProductIdtxt
            // 
            this.ProductIdtxt.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ProductIdtxt.Location = new System.Drawing.Point(155, 108);
            this.ProductIdtxt.Name = "ProductIdtxt";
            this.ProductIdtxt.Size = new System.Drawing.Size(122, 26);
            this.ProductIdtxt.TabIndex = 1;
            this.ProductIdtxt.TextChanged += new System.EventHandler(this.ProductIdtxt_TextChanged);
            this.ProductIdtxt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.ProductIdtxt_KeyDown);
            this.ProductIdtxt.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.ProductIdtxt_KeyPress);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(484, 80);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(61, 17);
            this.label3.TabIndex = 14;
            this.label3.Text = "Quantity";
            // 
            // Quantitytxt
            // 
            this.Quantitytxt.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Quantitytxt.Location = new System.Drawing.Point(484, 108);
            this.Quantitytxt.Name = "Quantitytxt";
            this.Quantitytxt.Size = new System.Drawing.Size(168, 26);
            this.Quantitytxt.TabIndex = 3;
            this.Quantitytxt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Quantitytxt_KeyDown);
            this.Quantitytxt.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.Quantitytxt_KeyPress);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(678, 80);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(48, 17);
            this.label4.TabIndex = 15;
            this.label4.Text = "Status";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label5.Location = new System.Drawing.Point(26, 81);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(38, 17);
            this.label5.TabIndex = 16;
            this.label5.Text = "Date";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("Book Antiqua", 16F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Underline))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label6.ForeColor = System.Drawing.Color.DarkOliveGreen;
            this.label6.Location = new System.Drawing.Point(353, 17);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(147, 27);
            this.label6.TabIndex = 17;
            this.label6.Text = "STOCK LIST";
            this.label6.Click += new System.EventHandler(this.label6_Click);
            // 
            // ResetRecordbtn
            // 
            this.ResetRecordbtn.BackColor = System.Drawing.Color.DarkOliveGreen;
            this.ResetRecordbtn.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.ResetRecordbtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ResetRecordbtn.ForeColor = System.Drawing.Color.White;
            this.ResetRecordbtn.Location = new System.Drawing.Point(484, 153);
            this.ResetRecordbtn.Name = "ResetRecordbtn";
            this.ResetRecordbtn.Size = new System.Drawing.Size(57, 40);
            this.ResetRecordbtn.TabIndex = 20;
            this.ResetRecordbtn.Text = "Reset";
            this.ResetRecordbtn.UseVisualStyleBackColor = false;
            this.ResetRecordbtn.Click += new System.EventHandler(this.ResetRecordbtn_Click);
            // 
            // Deletebtn
            // 
            this.Deletebtn.BackColor = System.Drawing.Color.DarkOliveGreen;
            this.Deletebtn.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.Deletebtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Deletebtn.ForeColor = System.Drawing.Color.White;
            this.Deletebtn.Location = new System.Drawing.Point(381, 154);
            this.Deletebtn.Name = "Deletebtn";
            this.Deletebtn.Size = new System.Drawing.Size(83, 39);
            this.Deletebtn.TabIndex = 19;
            this.Deletebtn.Text = "Delete";
            this.Deletebtn.UseVisualStyleBackColor = false;
            this.Deletebtn.Click += new System.EventHandler(this.Deletebtn_Click);
            // 
            // Addbtn
            // 
            this.Addbtn.BackColor = System.Drawing.Color.DarkOliveGreen;
            this.Addbtn.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.Addbtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Addbtn.ForeColor = System.Drawing.Color.White;
            this.Addbtn.Location = new System.Drawing.Point(294, 153);
            this.Addbtn.Name = "Addbtn";
            this.Addbtn.Size = new System.Drawing.Size(81, 40);
            this.Addbtn.TabIndex = 18;
            this.Addbtn.Text = "Add";
            this.Addbtn.UseVisualStyleBackColor = false;
            this.Addbtn.Click += new System.EventHandler(this.Addbtn_Click);
            // 
            // dataGridViewstocklist
            // 
            this.dataGridViewstocklist.AllowUserToAddRows = false;
            this.dataGridViewstocklist.AllowUserToDeleteRows = false;
            this.dataGridViewstocklist.AllowUserToResizeColumns = false;
            this.dataGridViewstocklist.AllowUserToResizeRows = false;
            this.dataGridViewstocklist.BackgroundColor = System.Drawing.SystemColors.ButtonFace;
            this.dataGridViewstocklist.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.dataGridViewstocklist.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.Sunken;
            this.dataGridViewstocklist.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridViewstocklist.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.dgprocode,
            this.dgproname,
            this.dgqty,
            this.dgdate,
            this.dgstatus});
            this.dataGridViewstocklist.GridColor = System.Drawing.SystemColors.ButtonFace;
            this.dataGridViewstocklist.Location = new System.Drawing.Point(29, 213);
            this.dataGridViewstocklist.Name = "dataGridViewstocklist";
            this.dataGridViewstocklist.RowHeadersVisible = false;
            this.dataGridViewstocklist.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.dataGridViewstocklist.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.dataGridViewstocklist.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataGridViewstocklist.Size = new System.Drawing.Size(805, 253);
            this.dataGridViewstocklist.TabIndex = 21;
            this.dataGridViewstocklist.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.dataGridViewstocklist_MouseDoubleClick);
            // 
            // dgprocode
            // 
            this.dgprocode.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.dgprocode.HeaderText = "Product ID";
            this.dgprocode.Name = "dgprocode";
            // 
            // dgproname
            // 
            this.dgproname.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.dgproname.HeaderText = "Product Name";
            this.dgproname.Name = "dgproname";
            // 
            // dgqty
            // 
            this.dgqty.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.dgqty.HeaderText = "Quantity";
            this.dgqty.Name = "dgqty";
            // 
            // dgdate
            // 
            this.dgdate.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.dgdate.HeaderText = "Date";
            this.dgdate.Name = "dgdate";
            // 
            // dgstatus
            // 
            this.dgstatus.HeaderText = "Status";
            this.dgstatus.Name = "dgstatus";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Microsoft Sans Serif", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label7.Location = new System.Drawing.Point(70, 496);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(105, 18);
            this.label7.TabIndex = 22;
            this.label7.Text = "Total Product :";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Microsoft Sans Serif", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label8.Location = new System.Drawing.Point(579, 496);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(107, 18);
            this.label8.TabIndex = 23;
            this.label8.Text = "Total Quantity :";
            // 
            // Closebtn
            // 
            this.Closebtn.BackColor = System.Drawing.Color.Transparent;
            this.Closebtn.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("Closebtn.BackgroundImage")));
            this.Closebtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.Closebtn.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.Closebtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Closebtn.Location = new System.Drawing.Point(831, 5);
            this.Closebtn.Name = "Closebtn";
            this.Closebtn.Size = new System.Drawing.Size(31, 26);
            this.Closebtn.TabIndex = 24;
            this.Closebtn.UseVisualStyleBackColor = false;
            this.Closebtn.Click += new System.EventHandler(this.Closebtn_Click);
            // 
            // totalprolbl
            // 
            this.totalprolbl.AutoSize = true;
            this.totalprolbl.Font = new System.Drawing.Font("Microsoft Sans Serif", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.totalprolbl.Location = new System.Drawing.Point(172, 497);
            this.totalprolbl.Name = "totalprolbl";
            this.totalprolbl.Size = new System.Drawing.Size(16, 18);
            this.totalprolbl.TabIndex = 25;
            this.totalprolbl.Text = "0";
            // 
            // totalqtylbl
            // 
            this.totalqtylbl.AutoSize = true;
            this.totalqtylbl.Font = new System.Drawing.Font("Microsoft Sans Serif", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.totalqtylbl.Location = new System.Drawing.Point(685, 497);
            this.totalqtylbl.Name = "totalqtylbl";
            this.totalqtylbl.Size = new System.Drawing.Size(16, 18);
            this.totalqtylbl.TabIndex = 26;
            this.totalqtylbl.Text = "0";
            // 
            // dateTimePicker1
            // 
            this.dateTimePicker1.CustomFormat = "dd/MM/yyyy";
            this.dateTimePicker1.Format = System.Windows.Forms.DateTimePickerFormat.Custom;
            this.dateTimePicker1.Location = new System.Drawing.Point(12, 110);
            this.dateTimePicker1.Name = "dateTimePicker1";
            this.dateTimePicker1.Size = new System.Drawing.Size(137, 20);
            this.dateTimePicker1.TabIndex = 27;
            // 
            // Stock
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(868, 537);
            this.Controls.Add(this.dateTimePicker1);
            this.Controls.Add(this.totalqtylbl);
            this.Controls.Add(this.totalprolbl);
            this.Controls.Add(this.Closebtn);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.dataGridViewstocklist);
            this.Controls.Add(this.ResetRecordbtn);
            this.Controls.Add(this.Deletebtn);
            this.Controls.Add(this.Addbtn);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.Quantitytxt);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.Productnametxt);
            this.Controls.Add(this.comboBoxproductstatus);
            this.Controls.Add(this.ProductIdtxt);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Stock";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Stock";
            this.Load += new System.EventHandler(this.Stock_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewstocklist)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox Productnametxt;
        private System.Windows.Forms.ComboBox comboBoxproductstatus;
        private System.Windows.Forms.TextBox ProductIdtxt;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox Quantitytxt;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Button ResetRecordbtn;
        private System.Windows.Forms.Button Deletebtn;
        private System.Windows.Forms.Button Addbtn;
        private System.Windows.Forms.DataGridView dataGridViewstocklist;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Button Closebtn;
        private System.Windows.Forms.Label totalprolbl;
        private System.Windows.Forms.Label totalqtylbl;
        private System.Windows.Forms.DataGridViewTextBoxColumn dgprocode;
        private System.Windows.Forms.DataGridViewTextBoxColumn dgproname;
        private System.Windows.Forms.DataGridViewTextBoxColumn dgqty;
        private System.Windows.Forms.DataGridViewTextBoxColumn dgdate;
        private System.Windows.Forms.DataGridViewTextBoxColumn dgstatus;
        private System.Windows.Forms.DateTimePicker dateTimePicker1;
    }
}