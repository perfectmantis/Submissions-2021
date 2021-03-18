package eventmanagement;

import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;


public class FormT extends JFrame {//starting class body.
                    Connect con=new Connect();
    Container c;
public FormT()
{//starting constructor of class.
        super("Update event");
c=getContentPane();
        setLayout(new GridLayout(1,0));
            JTable tbl=new JTable();
                    tbl.setPreferredScrollableViewportSize(new Dimension(500, 70));
            fill(tbl);
            JScrollPane scroll=new JScrollPane(tbl);
            
    JButton btnU=new JButton("Update");
    JButton btnC=new JButton("Back");//these are all table, scrollPane and buttons.
    c.add(scroll);
    
    c.add(btnU);
    c.add(btnC);//added all the thing into container.
    tbl.addMouseListener(new java.awt.event.MouseAdapter(){//starting mouse click event.
public void mouseClicked(java.awt.event.MouseEvent evt){
    int r=tbl.getSelectedRow();
    FormU.id=tbl.getModel().getValueAt(r, 0).toString();
    FormU.user=tbl.getModel().getValueAt(r, 1).toString();
    FormU.title=tbl.getModel().getValueAt(r, 2).toString();
    FormU.date=tbl.getModel().getValueAt(r, 3).toString();
    FormU.time=tbl.getModel().getValueAt(r, 4).toString();
    FormU.des=tbl.getModel().getValueAt(r, 5).toString();
    FormU.color=tbl.getModel().getValueAt(r, 6).toString();
    System.out.println(FormU.id+FormU.user+FormU.title+FormU.date+FormU.time+FormU.color);
}});//end of event.
  
        btnC.addActionListener(new ActionListener() {//starting cancel button's event.

            @Override
            public void actionPerformed(ActionEvent e) {
                MainForm m=new MainForm();
                m.setSize(700,600);
                m.setVisible(true);
                m.setLocationRelativeTo(null);
                dispose();
            }
                    }
    );//end of event.

        btnU.addActionListener(new ActionListener() {//starting update button's event.

            @Override
            public void actionPerformed(ActionEvent e) {
                try
                {
             FormU fu=new FormU();
             fu.setSize(700, 600);
                    fu.setVisible(true);
                    fu.setLocationRelativeTo(null);
                    dispose();
                }
                catch(Exception x)
                {
                    System.out.println("    error in update");
                    System.out.println(x.getMessage()                   );
                }
            }
        }
                );//end of event.
}//end of class constructor.

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


}//end of class body.
