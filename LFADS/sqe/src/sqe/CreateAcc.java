/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sqe;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;


public class CreateAcc extends javax.swing.JFrame {


    public CreateAcc() {
        initComponents();
        this.setLocationRelativeTo(null);
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel1 = new javax.swing.JLabel();
        jButton1 = new javax.swing.JButton();
        Usernametext = new javax.swing.JTextField();
        tokentext = new javax.swing.JTextField();
        createacc = new javax.swing.JButton();
        passwordtext = new javax.swing.JPasswordField();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jLabel1.setFont(new java.awt.Font("Times New Roman", 1, 24)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(255, 255, 255));
        jLabel1.setText("LANGUAGE FILTER AND ABUSE DETECTION SYSTEM");
        getContentPane().add(jLabel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(60, 30, -1, -1));

        jButton1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/sqe/manlapt.jpeg"))); // NOI18N
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });
        getContentPane().add(jButton1, new org.netbeans.lib.awtextra.AbsoluteConstraints(171, 97, 411, 265));

        Usernametext.setFont(new java.awt.Font("Times New Roman", 0, 18)); // NOI18N
        Usernametext.setText("User Name");
        Usernametext.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                UsernametextActionPerformed(evt);
            }
        });
        getContentPane().add(Usernametext, new org.netbeans.lib.awtextra.AbsoluteConstraints(171, 405, 411, 45));

        tokentext.setFont(new java.awt.Font("Times New Roman", 0, 18)); // NOI18N
        tokentext.setText("Enter Token Number");
        getContentPane().add(tokentext, new org.netbeans.lib.awtextra.AbsoluteConstraints(171, 558, 411, 44));

        createacc.setFont(new java.awt.Font("Times New Roman", 0, 18)); // NOI18N
        createacc.setText("Create Account");
        createacc.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                createaccMouseClicked(evt);
            }
        });
        createacc.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                createaccActionPerformed(evt);
            }
        });
        getContentPane().add(createacc, new org.netbeans.lib.awtextra.AbsoluteConstraints(171, 638, 411, 48));

        passwordtext.setText("jPasswordField2");
        getContentPane().add(passwordtext, new org.netbeans.lib.awtextra.AbsoluteConstraints(170, 480, 410, 40));

        jLabel2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/sqe/a.jpg"))); // NOI18N
        getContentPane().add(jLabel2, new org.netbeans.lib.awtextra.AbsoluteConstraints(130, 80, 500, 630));

        jLabel3.setIcon(new javax.swing.ImageIcon(getClass().getResource("/sqe/bg2.jpg"))); // NOI18N
        getContentPane().add(jLabel3, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 10, 810, 770));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void UsernametextActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_UsernametextActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_UsernametextActionPerformed

    private void createaccActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_createaccActionPerformed
        // TODO add your handling code here:


    }//GEN-LAST:event_createaccActionPerformed

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jButton1ActionPerformed

    public boolean Verify(String uname, String pass, String token) {
     
            if (uname.isEmpty() || pass.isEmpty() || token.isEmpty())
            return false;
            
            else 
            return true;  
    }

    public boolean VerifyPass(String pass) {
        if (pass.length() >= 8) 
            return true;
         
        else 
        {
            return false;
        }
    }

    public boolean VerifyName(String uname) {
        if (Character.isDigit(uname.charAt(0)))
        {
            return false;
        }
        else 
        {
            return true;
        }
    }

    private void createaccMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_createaccMouseClicked

        String entuser = Usernametext.getText();
        entuser.trim();
        String entpass = String.valueOf(passwordtext.getPassword());
        entpass.trim();
        String token = tokentext.getText();
        token.trim();
        
       if(((Verify(entuser, entpass, token))) && ( VerifyPass(entpass) ) && (VerifyName(entuser)) )
        {
            try 
            {
                JOptionPane.showMessageDialog(null, "Your Account has been successfully Created!!");
                
                String url="jdbc:derby://localhost:1527/LFADS";
                java.sql.Connection con =  DriverManager.getConnection(url,null,null);
                Statement st = con.createStatement();
                st.execute("INSERT INTO USERR values('"+entuser+"','"+entpass+"','"+token+"')");
                dispose();
                
                Welcx.main(null);
            } catch (SQLException ex)
            {
                Logger.getLogger(CreateAcc.class.getName()).log(Level.SEVERE, null, ex);
            }
        } 
       else 
       {
            JOptionPane.showMessageDialog(null, "Entered Credentials are Incorrect!");
       }

    }//GEN-LAST:event_createaccMouseClicked

    public static void main(String args[]) throws SQLException {
          
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(CreateAcc.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(CreateAcc.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(CreateAcc.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(CreateAcc.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new CreateAcc().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JTextField Usernametext;
    private javax.swing.JButton createacc;
    private javax.swing.JButton jButton1;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JPasswordField passwordtext;
    private javax.swing.JTextField tokentext;
    // End of variables declaration//GEN-END:variables
}
