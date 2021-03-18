package eventmanagement;

import java.awt.Container;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
public class LoginForm extends JFrame {//starting class body.
    Connect con=new Connect();
public static String user;    
                Container c;
                public LoginForm(){//starting class constructor.
                                        super("Login form");
                                                                    c=getContentPane();
                                                                                                    setLayout(new GridLayout(7,2));
JLabel lbUser=new JLabel("User name:");
JLabel lbPas=new JLabel("Password:"); //labels of this frame.
JTextField txtUser=new JTextField(30);

JPasswordField txtPas=new JPasswordField(20); //textFields of this frame.
JButton btnLogin=new JButton("Login");


 
JButton btnSignUp=new JButton("Sign up "); //buttons of this frame.


c.add(lbUser);
c.add(txtUser);
c.add(lbPas);
c.add(txtPas);
c.add(btnLogin);

c.add(btnSignUp); //added all fields in to container.
btnLogin.addActionListener(new ActionListener()
{//starting login button event.
                
                            @Override
                            public void actionPerformed(ActionEvent e) {
                                
try{// starting try.
    String q="select * from user_details where userName='"+txtUser.getText()+"' and pas='"+txtPas.getText()+"'";
ResultSet rs=con.st.executeQuery(q); //insert query.
if(txtUser!=null && txtPas!=null)
{

if(rs.next()){
    user=txtUser.getText();
JOptionPane.showMessageDialog(null, "Welcome user "+LoginForm.user);

MainForm m=new MainForm();
m.setSize(700,600);
m.setVisible(true);
m.setLocationRelativeTo(null);
dispose();
}
else{
    JOptionPane.showMessageDialog(null,"Invalid user name or password");
}// condition.
}
}//end of try.

                        catch(Exception ex){
                            
                                System.out.println("error");
                                ex.printStackTrace();}//end of catch.


                            }
                        }
); //end of login button event.
btnSignUp.addActionListener(new ActionListener()
{//starting signup button's event.
public void actionPerformed(ActionEvent ae)
{
    SigenupForm s=new SigenupForm();
    s.setSize(700,600);
    s.setVisible(true);
    s.setLocationRelativeTo(null);
    dispose();
    
}}
); //end of signup button's event.

                }//end of constructor.
    
}//end of class body.
