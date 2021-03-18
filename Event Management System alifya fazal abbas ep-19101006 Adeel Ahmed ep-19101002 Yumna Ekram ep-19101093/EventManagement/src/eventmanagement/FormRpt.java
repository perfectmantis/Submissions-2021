package eventmanagement;

import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.Document;
import com.toedter.calendar.JDateChooser;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileOutputStream;
import java.sql.ResultSet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;


public class FormRpt extends JFrame  {//starting class body.
        Connect con=new Connect();
    Container c;
    public FormRpt(){//starting constructor of class.
        super("View Events");
    c=getContentPane();
        setLayout(new GridLayout(7,2));
        JLabel lbDate1=new JLabel("From");
        JDateChooser txtD1=new JDateChooser();
        JLabel lbDate2=new JLabel("To");
        JDateChooser txtD2=new JDateChooser();

        
        JButton btnV=new JButton("View");
        JButton btnSave=new JButton("Save");
        JButton btnCancel=new JButton("Back");
        
        
                    JTable tbl=new JTable();
                    fill(tbl);
                                        tbl.setPreferredScrollableViewportSize(new Dimension(500, 500));
                                        tbl.setSize(500, 500);
                                        JScrollPane scroll=new JScrollPane(tbl);//these are all labels, textFields table, buttons and scrollPane.
                                        c.add(lbDate1);
                                        c.add(txtD1);
                                        c.add(lbDate2);
                                        c.add(txtD2);
                                       
                                        c.add(btnSave);
                                        c.add(btnV);
                                        c.add(btnCancel);
                                        c.add(scroll);//added all the things in to container.
                                        btnV.addActionListener(new ActionListener() {//starting view button's events.

            @Override
            public void actionPerformed(ActionEvent e) {
                filldate(tbl, txtD1, txtD2);
            }
        }   );//end of event.
    btnSave.addActionListener(new ActionListener() {//starting save button's event.

            @Override
            public void actionPerformed(ActionEvent e) {
                try{
                    //this is the code of pdf file.
                    Document doc=new Document();
                    PdfWriter.getInstance(doc, new FileOutputStream("events.pdf"));
                    doc.open();
                    PdfPTable pd=new PdfPTable(tbl.getColumnCount());
                    
                    
                    for(int i=0; i<tbl.getColumnCount(); i++){
                        pd.addCell(tbl.getColumnName(i));
                        
                    }
                    for(int r=0; r<tbl.getRowCount()-1; r++){
                    for(int c=0; c<tbl.getColumnCount(); c++){
                    pd.addCell(tbl.getModel().getValueAt(r, c).toString());
                    }}
                    doc.add(pd);
                    doc.close();
                    JOptionPane.showMessageDialog(rootPane, "Report have been saved in PDF");
                }
                    catch(Exception ex){
                            System.out.println(ex);
                            }
                    
                }

            
        }
        );//end of event.
    btnCancel.addActionListener(new ActionListener() {//starting cancel button's event.

            @Override
            public void actionPerformed(ActionEvent e) {
MainForm m=new MainForm();
m.setSize(700,600);
m.setVisible(true);
dispose();
            }
        });//end of event.
                
    }//end   of class constructor.
        public void fill(JTable tb)
{//mathod for table.
    try{
    DefaultTableModel dt=new DefaultTableModel();
    dt.addColumn("Event Id");
    dt.addColumn("User name");
    dt.addColumn("Event title");
    dt.addColumn("Event date");
    dt.addColumn("Event time");
    dt.addColumn("Event discribtion");
dt.addColumn("Event color");
String q="select * from event_details where user_name='"+LoginForm.user+"'";
ResultSet rs=con.st.executeQuery(q);
while(rs.next())
{
dt.addRow(new Object[]{
 rs.getString("eId"), rs.getString("user_name"), rs.getString("eTitle"), rs.getString("eDate"), rs.getString("eTime"), rs.getString("eDesc"), rs.getString("ecolor")
      });
}
tb.setModel(dt);
    }
     catch(Exception x)
     {
         System.out.println("   error in table");
         System.out.println(x.getMessage());
     }
     }//end of mathod.

                public void filldate(JTable tb ,JDateChooser d1,JDateChooser d2)
{//mathod for datewise report.
    try{
    DefaultTableModel dt=new DefaultTableModel();
    dt.addColumn("Event Id");
    dt.addColumn("User name");
    dt.addColumn("Event title");
    dt.addColumn("Event date");
    dt.addColumn("Event time");
    dt.addColumn("Event discribtion");
dt.addColumn("Event color");
       
String q="select * from event_details where eDate between '"+((JTextField)d1.getDateEditor().getUiComponent()).getText()+"' and '"+((JTextField)d2.getDateEditor().getUiComponent()).getText()+"'";
ResultSet rs=con.st.executeQuery(q);
while(rs.next())
{
dt.addRow(new Object[]{
 rs.getString("eId"), rs.getString("user_name"), rs.getString("eTitle"), rs.getString("eDate"), rs.getString("eTime"), rs.getString("eDesc"), rs.getString("ecolor")
      });
}
tb.setModel(dt);
    }
     catch(Exception x)
     {
        
         System.out.println(x.getMessage());
     }
     }//end of mathod.



}//end of class body.
