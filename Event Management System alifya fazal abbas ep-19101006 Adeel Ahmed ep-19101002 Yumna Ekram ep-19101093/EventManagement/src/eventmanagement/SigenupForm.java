package eventmanagement;

import java.awt.Container;
import java.awt.GridLayout;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
public class SigenupForm extends JFrame {//this is Signup class.
    Connect con=new Connect();
    
            Container c;
                public SigenupForm(){//starting constructor of class.
                        super("sign up form");
                   
                        
                        c=getContentPane();
                                setLayout(new GridLayout(7,2));//this is layout.
                        JLabel lbfName=new JLabel("First name:");
                        JLabel lblName=new JLabel("Last name:");
                        JLabel lbUser=new JLabel("User name:");
                        JLabel lbPas=new JLabel("Password:");
                        JLabel lbAge=new JLabel("Age:");//these are the labels of this form.
                        JTextField txtfName=new JTextField(30);
JTextField txtlName=new JTextField(30);
JTextField txtUser=new JTextField(30);
JPasswordField txtPas=new JPasswordField(20);//these are textFieldes of this form.
JComboBox jCom=new JComboBox();//this is comboBox for age.
                        
                        
                        JButton btnSub=new JButton("Sign up");
                        
                        JButton btnCancel=new JButton("Cancel");//these are buttons of this form.
                        
//adding these labels, textFieldes and buttons  in to the container.
                        c.add(lbfName);
                        c.add(txtfName);
                        c.add(lblName);
                        c.add(txtlName);
                        c.add(lbUser);
                        c.add(txtUser);
                        c.add(lbPas);
                        c.add(txtPas);
                        c.add(lbAge);
                        c.add(jCom);
                        c.add(btnSub);
                        c.add(btnCancel);
                        btnSub.addActionListener(new ActionListener()
{//starting event.
                
                            @Override
                            public void actionPerformed(java.awt.event.ActionEvent e) {
                        try{//starting try.
                        String q="insert into user_details values('"+txtfName.getText()+"', '"+txtlName.getText()+"', '"+txtUser.getText()+"', '"+txtPas.getText()+"', '"+jCom.getSelectedItem()+"')";
                        con.st.executeUpdate(q);//inserting data into database.

                            JOptionPane.showMessageDialog(null, "Register successfully");
LoginForm l=new LoginForm();
l.setSize(700,600);
l.setVisible(true);
l.setLocationRelativeTo(null);
dispose();



                      }//end of try.
                        catch(Exception ex){//starting catch.
                                System.out.println("error");
                                ex.printStackTrace();}//end of catch.
                            }});//end of event.
                                                btnCancel.addActionListener(new ActionListener()
{//starting event of cancel.
                
                            @Override
                            public void actionPerformed(java.awt.event.ActionEvent e) {
                                System.exit(0);
                            }
                        }
);//end of cancel event.
                                                for(int i=18; i<=100; i++){
                                                jCom.addItem(i); }//loop for age.
                
                
                }//end of constructor. 
}//end of class body.