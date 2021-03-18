package eventmanagement;

import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;


public class MainForm extends JFrame{
    Connect con=new Connect();
    Container c;
    public MainForm(){
            super("Home");
            c=getContentPane();
                setLayout(new GridLayout(7,2));
                
                JTable tbl=new JTable();
              
                                    tbl.setPreferredScrollableViewportSize(new Dimension(500, 500));
            fill(tbl);
            JScrollPane scroll=new JScrollPane(tbl);

                
                JLabel lbWel=new JLabel("Wellcome "+LoginForm.user);
                JLabel lbDate=new JLabel("Date:");
                JLabel lbTime=new JLabel("Time:");
                JTextField txtD1=new JTextField(20);
                JTextField txtD2=new JTextField(20);
                JButton btnCreateE=new JButton("Create event");
                JButton btnUpdateE=new JButton("Update event");
                JButton btnDeleteE=new JButton("Delete event");
                JButton btnVE=new JButton("View your events");
                JButton btnLog=new JButton("Logout");
                c.add(lbWel);
                c.add(lbDate);
                c.add(txtD1);
                c.add(lbTime);
                c.add(txtD2);
                c.add(btnCreateE);
                c.add(btnUpdateE);
                c.add(btnDeleteE);
                c.add(btnVE);
                c.add(btnLog);
                c.add(scroll);
                
                btnCreateE.addActionListener(new ActionListener()
{
public void actionPerformed(ActionEvent ae)
{
    FormE fe=new FormE();
    fe.setSize(700,600);
    fe.setVisible(true);
                fe.setLocationRelativeTo(null);
    dispose();
}}
);
                btnUpdateE.addActionListener(new ActionListener()
{
    @Override
public void actionPerformed(ActionEvent ae)
{
    FormT ft=new FormT();
    
    ft.setSize(700,600);
    ft.setVisible(true);
    ft.setLocationRelativeTo(null);
    dispose();
    
}}
);
                btnDeleteE.addActionListener(new ActionListener()
{
    @Override
public void actionPerformed(ActionEvent ae)
{
    FormDl fd=new FormDl();
    
    fd.setSize(700,600);
    fd.setVisible(true);
    fd.setLocationRelativeTo(null);
    dispose();
    
}}
);
                btnVE.addActionListener(new ActionListener() {

                @Override
                public void actionPerformed(ActionEvent e) {
FormRpt fr=new FormRpt();
fr.setSize(700,600);
fr.setVisible(true);
fr.setLocationRelativeTo(null);
dispose();
        

        
                }
            });
                                        btnLog.addActionListener(new ActionListener()
{
public void actionPerformed(ActionEvent ae)
{
    LoginForm f=new LoginForm();
    
    f.setSize(700,600);
            
    
    f.setVisible(true);
    f.setLocationRelativeTo(null);
    dispose();
    
}}
);
    
        mytime(txtD1, txtD2);
    
    }


    
    
    public void  mytime(JTextField dates,JTextField times) //Method for displaying timer and date on frame
    {   
         
        Thread t;
        t = new Thread()
        {
            
            public void run()
            {
                
                for(;;)
                {
                    
                    Date DT = Calendar.getInstance().getTime();
                    DateFormat TT = new SimpleDateFormat("hh:mm:ss a");
                    DateFormat DD = new SimpleDateFormat("yyyy-MM-dd");
                    String Time = TT.format(DT);
                    String Date = DD.format(DT);
                    
                    
                    dates.setText(Date);
                    times.setText(Time);
                 
                try {
                    sleep(1000);
           try{
           ResultSet rst=con.st.executeQuery("select * from event_details where eDate=CONVERT(VARCHAR(100),GETDATE(),121) and eTime='"+Time+"'");
           if(rst.next()){
           FormAlaram al=new FormAlaram();
           al.play();
               JOptionPane.showMessageDialog(rootPane, "Alaram");
           }
                }
                catch(Exception ex){}
                    
                    
                } catch (InterruptedException ex) {
                    Logger.getLogger(MainForm.class.getName()).log(Level.SEVERE, null, ex);
                }
                
                
                
                }
            }
        };
        t.start();
        
    }
    
    


    public void fill(JTable tb) 
{
    try{
    DefaultTableModel dt=new DefaultTableModel();
    dt.addColumn("Event title");
    dt.addColumn("Event date");
    dt.addColumn("Event time");
    dt.addColumn("Event discribtion");
dt.addColumn("Event color");

Date date=new Date();

            Date dtBefore = new Date(date.getTime() -1 * 24 * 3600 * 1000);

            Date dtAfter = new Date(date.getTime() +7 * 24 * 3600 * 1000);
            String bDate = new SimpleDateFormat().format(dtBefore);
            String aDate = new SimpleDateFormat().format(dtAfter);

            
String q="select eTitle, eDate, eTime, eDesc, eColor from event_details where user_name='"+LoginForm.user+"' and eDate between '"+bDate+"' and '"+aDate+"' order by eDate asc";
ResultSet rs=con.st.executeQuery(q);
while(rs.next())
{
dt.addRow(new Object[]{
rs.getString("eTitle"), rs.getString("eDate"), rs.getString("eTime"), rs.getString("eDesc"), rs.getString("ecolor")
      });
}
tb.setModel(dt);
    }
     catch(Exception x)
     {
         System.out.println("   error in table main form");
         System.out.println(x.getMessage());
     }
     }}
