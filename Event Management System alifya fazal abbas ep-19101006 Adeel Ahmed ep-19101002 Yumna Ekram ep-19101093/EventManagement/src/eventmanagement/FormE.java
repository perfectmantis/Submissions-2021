package eventmanagement;
import com.toedter.calendar.JDateChooser;
import static eventmanagement.FormU.time;
import java.awt.Color;
import java.awt.Container;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
public class FormE extends JFrame {//starting class body.
    Connect con=new Connect();
    Container c;
    public FormE(){//starting constructor of class.
    super();
c=getContentPane();
    setLayout(new GridLayout(7,2));
    JLabel lbTitle=new JLabel("Event title:");
    JTextField txtTitle=new JTextField(40);
    JLabel lbDate=new JLabel("Event date:");
        JDateChooser        jc=new JDateChooser();

    JLabel lbTime=new JLabel("Event time:");
    JComboBox jComHr=new JComboBox();
    JComboBox jComMn=new JComboBox();
    JComboBox jComSS=new JComboBox();
    
    JComboBox jComAm=new JComboBox();
    
    JLabel lbDes=new JLabel("Event Description:");
    JTextArea txtArea=new JTextArea();
    JLabel lbClr=new JLabel("Event colour:");
        JComboBox colorC=new JComboBox();
    JButton colorPicker=new JButton("Color Pick");
        
JButton btnSub=new JButton("Create event");
    JButton btnCancel=new JButton("Back");//these are all labels, fields, comboBox and buttons.
    c.add(lbTitle);
    c.add(txtTitle);
    c.add(lbDate);
    c.add(jc);
   
    c.add(lbTime);
    c.add(jComHr);
    c.add(jComMn);
    c.add(jComSS);
    c.add(jComAm);
    c.add(lbDes);
    c.add(txtArea);
    c.add(lbClr);
    c.add(colorC);
    c.add(btnSub);
    c.add(btnCancel);
    c.add(colorPicker);//added all the things in to container.
    
    colorPicker.addActionListener(new ActionListener() {//starting color button's event.

        @Override
        public void actionPerformed(ActionEvent e) {
if(colorC.equals("Red")){
}
            Color color=Color.RED;
            colorPicker.setBackground(color);
        }
        

    });//end of event.
    
    
                            btnSub.addActionListener(new ActionListener()
{//starting submit button's event.
                
                            @Override
                            public void actionPerformed(ActionEvent e) {
                                
                                String timeC=String.valueOf(jComHr.getSelectedItem())+":"+String.valueOf(jComMn.getSelectedItem())+":"+String.valueOf(jComSS.getSelectedItem())+" "+String.valueOf(jComAm.getSelectedItem());
                                String clr=String.valueOf(colorC.getSelectedItem()); 
                                
                        try{//starting try.
                             SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd");
                             Date d=jc.getDate();
                             String S=df.format(d);
                            
                            
                        String q="insert into event_details values('"+LoginForm.user+"','"+txtTitle.getText()+"', '"+S+"', '"+timeC+"', '"+txtArea.getText()+"', '"+clr+"')";
                        con.st.executeUpdate(q);
                        JOptionPane.showMessageDialog(null, "Event created successfully");
                        MainForm m=new MainForm();
                        m.setSize(700,600);
                        m.setVisible(true);
                        m.setLocationRelativeTo(null);
                        dispose();
                      }//end of try.
                        catch(Exception ex){
                            JOptionPane.showMessageDialog(null, "Error");
                                System.out.println("error");
                                ex.printStackTrace();}//end of catch.
                        }});//end of event.
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
                            
                                    

for(int mn=00; mn<=59; mn++){
jComMn.addItem(mn);
}
for(int ss=00; ss<=59; ss++){
jComSS.addItem(ss);
}
jComAm.addItem("AM");
jComAm.addItem("PM");
colorC.addItem("Red");
colorC.addItem("Orange");
colorC.addItem("Yellow");
colorC.addItem("Green");
colorC.addItem("Blue");
colorC.addItem("Indigo");
colorC.addItem("Violet");
       jComHr.addItem("01");
       jComHr.addItem("02");
       jComHr.addItem("03");
       jComHr.addItem("04");
       jComHr.addItem("05");
       jComHr.addItem("06");
       jComHr.addItem("07");
       jComHr.addItem("08");
       jComHr.addItem("09");
       jComHr.addItem("10");
       jComHr.addItem("11");
       jComHr.addItem("12");
    
    }//end of class  constructor.

    
    
    
}//end of class body.
