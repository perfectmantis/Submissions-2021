    package eventmanagement;

import javax.swing.UIManager;

public class EventManagement {


    public static void main(String[] args) {
        try
        {
        UIManager.setLookAndFeel("com.jtattoo.plaf.acryl.AcrylLookAndFeel");}
                                catch(Exception ex){
                                    System.out.println(ex);
                            
}
            LoginForm l=new LoginForm();
            l.setSize(700,600);
            l.setVisible(true);
            l.setLocationRelativeTo(null);
            
            
            
            
    
         }

}
    