package eventmanagement;

import com.toedter.calendar.JDateChooser;
import java.awt.Container;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Date;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;


public class FormU extends JFrame{//starting class body.
    public static String id,user,title,date,time,des,color;
    Connect con=new Connect();
Container c;
 String dateC;
String timeC;
String clr;
public FormU(){//starting of class constructor.
    super("update event");
c=getContentPane();
    setLayout(new GridLayout(20,7));
JLabel lbId=new JLabel();
JTextField txtId=new JTextField();
    JLabel lbUser = new JLabel();
    JTextField txtUser=new JTextField();
    JLabel lbTitle=new JLabel("Event title:");
    JTextField txtTitle=new JTextField(40);
    JLabel lbDate=new JLabel("Event date:");
    JDateChooser dateC=new JDateChooser();
        

    JLabel lbTime=new JLabel("Event time:");
    JComboBox jComHr=new JComboBox();
    JComboBox jComMn=new JComboBox();
    JComboBox jComAm=new JComboBox();
    
    JLabel lbDes=new JLabel("Event Description:");
    JTextArea txtArea=new JTextArea();
    JLabel lbClr=new JLabel("Event colour:");
        JComboBox colorC=new JComboBox();
    
        
JButton btnUpd=new JButton("Update event");
    JButton btnCancel=new JButton("Back");//these are all labels, fields, combobox and buttons.
    c.add(lbId);
    c.add(txtId);
    c.add(lbUser);
    c.add(txtUser);
    c.add(lbTitle);
    c.add(txtTitle);
    
    c.add(lbDate);
    c.add(dateC);
   
    c.add(lbTime);
    c.add(jComHr);
    c.add(jComMn);
    c.add(jComAm);
    c.add(lbDes);
    c.add(txtArea);
    c.add(lbClr);
    c.add(colorC);
    c.add(btnUpd);
    c.add(btnCancel);//added all the things into container.
                            btnUpd.addActionListener(new ActionListener()
{//starting update button's event.
                
                            @Override
                            public void actionPerformed(ActionEvent e) {
                                
                                timeC=String.valueOf(jComHr.getSelectedItem())+":"+String.valueOf(jComMn.getSelectedItem())+":"+String.valueOf(jComAm.getSelectedItem());
                                 clr=String.valueOf(colorC.getSelectedItem()); 
                                
                        try{
                            
                        String q="update event_details set  eTitle='"+txtTitle.getText()+"',  eDate='"+((JTextField)dateC.getDateEditor().getUiComponent()).getText()+"',  eTime='"+timeC+"', eDesc='"+txtArea.getText()+"', eColor='"+clr+"' where eId='"+txtId.getText()+"' and user_name='"+txtUser.getText()+"'";
                        con.st.executeUpdate(q);
                        JOptionPane.showMessageDialog(null, "Event updated successfully");
FormDl d=new FormDl();
d.setSize(700,600);
                        d.setVisible(true);
                        d.setLocationRelativeTo(null);
                        dispose();
                      }
                        catch(Exception ex){
                                                        JOptionPane.showMessageDialog(null, "Error");
                                System.out.println("error");
                                ex.printStackTrace();}}});//end of event.
                            btnCancel.addActionListener(new ActionListener()
{//starting cancel button's event.
                
                            @Override
                            public void actionPerformed(java.awt.event.ActionEvent e) {
                                MainForm m=new MainForm();
                                m.setSize(700,600);
                                m.setVisible(true);
                                m.setLocationRelativeTo(null);
                                dispose();
                            }
                        }
);//end of event.
                            
                            //these are loops for time and color.
                            
for(int hr=01; hr<=12; hr++){
    jComHr.addItem(hr);
}
for(int mn=00; mn<=59; mn++){
jComMn.addItem(mn);
}
jComAm.addItem("am");
jComAm.addItem("pm");
colorC.addItem("Red");
colorC.addItem("Orange");
colorC.addItem("Yellow");
colorC.addItem("Green");
colorC.addItem("Blue");
colorC.addItem("Indigo");
colorC.addItem("Violet");
txtId.setText(id);
txtUser.setText(user);
    txtTitle.setText(title);
dateC.setDate(Date.valueOf(date));
    timeC=time;
    txtArea.setText(des);
            
    clr=color;
    
    }//end of class constructor.

    
    

    }//end of class body.    

