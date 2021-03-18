package eventmanagement;
import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.Statement;//these are SQL Server JDBC Driver classes. 
public class Connect {//starting class body.
    Connection con;
Statement st;
public Connect()
{//starting constructor.
try{//starting try.
                // Load the SQLServerDriver class, build the 
            // connection string, and get a connection 
    Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
String dpath="jdbc:sqlserver://DESKTOP-CPJM03H:1433;databaseName=event_management;user=sa;password=123;";

con=DriverManager.getConnection(dpath);
st= con.createStatement();
    System.out.println("successfully connected!");

}//end of try.
catch(Exception c)
{//starting catch.
System.out.println(c.getMessage());
}//end of catch.
//end of constructor.
}    
}//end of class body.
