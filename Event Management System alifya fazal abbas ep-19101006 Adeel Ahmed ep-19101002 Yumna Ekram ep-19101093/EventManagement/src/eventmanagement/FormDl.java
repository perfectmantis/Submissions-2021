package eventmanagement;

import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;


public class FormDl extends JFrame {//starting class body.
                Connect con=new Connect();
    Container c;
 public String id,user,title,date,time,des,color;
    
    
    public FormDl(){//starting class constructor.
        super("Delete event");
c=getContentPane();
        setLayout(new GridLayout(1,0));
            JTable tbl=new JTable();
                    tbl.setPreferredScrollableViewportSize(new Dimension(500, 70));
        fill(tbl);
                JScrollPane scroll=new JScrollPane(tbl);
        JButton btnDelete=new JButton("Delete selected event");
        JButton btnCancel=new JButton("Back");//these are all tables, scrollPane and buttons.
        

    c.add(scroll);
    c.add(btnDelete);
    c.add(btnCancel);//added all the things in to container.
    
    
        tbl.addMouseListener(new java.awt.event.MouseAdapter(){//starting mouse click event.
public void mouseClicked(java.awt.event.MouseEvent evt){
    int r=tbl.getSelectedRow();
    id=tbl.getModel().getValueAt(r, 0).toString();
    user=tbl.getModel().getValueAt(r, 1).toString();
    title=tbl.getModel().getValueAt(r, 2).toString();
    date=tbl.getModel().getValueAt(r, 3).toString();
    time=tbl.getModel().getValueAt(r, 4).toString();
    des=tbl.getModel().getValueAt(r, 5).toString();
    color=tbl.getModel().getValueAt(r, 6).toString();//selected row's colemns.
    System.out.println(id+user+title+date+time+color);
}});//end of mouse click event.


        
    
    btnDelete.addActionListener(new ActionListener() {//starting delete button's event

            @Override
            public void actionPerformed(ActionEvent e) {
try
{//starting try.
    
    int yes=JOptionPane.showConfirmDialog(rootPane, "Are you sure you want to delete your event?");
if(yes==JOptionPane.YES_OPTION)
{
    
String q="delete from event_details where eId='"+id+"'";
con.st.executeUpdate(q);//this is delete query.
    JOptionPane.showMessageDialog(null,"Event deleted successfully");
    fill(tbl);
}
else{

}//condition.
FormDl fd=new FormDl();
fd.setVisible(true);
fd.setLocationRelativeTo(null);
}//end of try.
catch(Exception x)
{
    System.out.println("error in del form");
    JOptionPane.showMessageDialog(null, "try again!");
    System.out.println(x.getMessage()    );
}//end of catch.
                
            }
        }
    );//end of delete button's event.
    btnCancel.addActionListener(new ActionListener() {//starting cancel button's event.

            @Override
            public void actionPerformed(ActionEvent e) {
                MainForm m=new MainForm();
                m.setSize(700,600);
                m.setVisible(true);
                m.setLocationRelativeTo(null);
                dispose();
            }

            
        }
    );//end of cancel button's event.
}//end of class constructor.
 
    public void fill(JTable tb)
{//starting mathod for fill table.
    try{
    DefaultTableModel dt=new DefaultTableModel();
    dt.addColumn("Event Id");
    dt.addColumn("User name");
    dt.addColumn("Event title");
    dt.addColumn("Event date");
    dt.addColumn("Event time");
    dt.addColumn("Event discribtion");
dt.addColumn("Event color");//added colemns in DefaultTableModel.
String q="select * from event_details where user_name='"+LoginForm.user+"'";
ResultSet rs=con.st.executeQuery(q);//select query.
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