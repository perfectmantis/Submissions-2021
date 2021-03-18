/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sqe;

/**
 *
 * @author 92332
 */
import com.restfb.*;
import com.restfb.types.*;
import java.io.IOException;
import java.net.UnknownHostException;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.*;
public class Postt {
    
    public static String[] data_set = {"Fuck","crap","Crappy","bitch","asshole","assholes","shit","Bastards","Fucking", "fucking","moron","BC","manhos","harami"};
    static String filteredPost;
    static int Abuse_Count = 0;
         
   public static void FilterPost(String Post)
         { 
              filteredPost = "";
              Abuse_Count = 0;
              String[]  words = Post.split(" ");
              
              for(int i = 0; i < words.length; i++)
              {
                 for(int j = 0; j < data_set.length; j++)
                 {
                     if(words[i].equals(data_set[j]))
                     {
                         Abuse_Count++;
                         words[i] = words[i].replace(words[i], "****");
                     }
                 }
              }
              //Concatenate
              for(int i = 0; i < words.length; i++)
              {
                  filteredPost = filteredPost + words[i] + " ";
              }
              System.out.println(filteredPost);
              
         }
      
    public void GetPost(String accessToken)  throws UnknownHostException, SQLException, IOException, Exception
        { 
            // creating database connection
            String url="jdbc:derby://localhost:1527/LFADS";  
            java.sql.Connection con =  DriverManager.getConnection(url,null,null);
            Statement st = con.createStatement(); 
            
            // getting fb posts
            FacebookClient fbClient = new DefaultFacebookClient(accessToken,Version.LATEST);
        
            String post, postid;
            Date timestamp;
            JSONArray array = new JSONArray();
            JSONObject obj;
    
            User me = fbClient.fetchObject("me", User.class);
            Connection<Post> result= fbClient.fetchConnection("me/feed", Post.class);
       
            int counter = 0;
        for(List<Post> page:result)
        {
            for(Post aPost:page)
            {
                obj = new JSONObject();
                postid = aPost.getId();
                post = aPost.getMessage();
                timestamp = aPost.getCreatedTime();

                obj.put("id", postid);
                obj.put("post", post);
                obj.put("timestamp", timestamp);
              
                array.add(obj);
                System.out.println("Post: " + counter + " " + post + ", Timestamp:  " + timestamp);
                
                FilterPost(post);
              
                st.execute("INSERT INTO POST values('"+postid+"','"+post+"','"+filteredPost+"','"+Abuse_Count+"')");
                
                counter++;
                if(counter==10)
                    break;
            }
            if(counter==10)
                    break;     
        }
        System.out.println("No. of counts: "+counter);
        }
    

    public static void main(String[] args) {
       
        try {
            Postt p = new Postt();
            String token = "";
            String url="jdbc:derby://localhost:1527/LFADS";
            java.sql.Connection con =  DriverManager.getConnection(url,null,null);
            Statement st = con.createStatement();
            ResultSet search = st.executeQuery("select * from USERR where username = '"+ Welcx.currentuser + "'");
            
            while(search.next())
            {
                token = search.getString("TOKEN");
            }
            
            p.GetPost(token);
            
        } catch (SQLException ex) {
            Logger.getLogger(Postt.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(Postt.class.getName()).log(Level.SEVERE, null, ex);
        }
        
         
       
    }
    
}
