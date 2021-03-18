package eventmanagement;

import java.io.FileInputStream;
import java.io.InputStream;
import sun.audio.AudioPlayer;
import sun.audio.AudioStream;


public class FormAlaram {
    
   
public void play() //Method for playing alarm sournd
{
 
    try{
   InputStream in = new FileInputStream("‪C:\\Users\\Adeel Raja\\Documents\\NetBeansProjects\\EventManagement\\src\\eventmanagement\\New folder\\alarm_beep.wav");
   AudioStream as = new AudioStream(in);
   AudioPlayer.player.start(in);
       }
    catch(Exception ex)
    {
    
        System.out.println(ex);
    
    }
}
    
    
    
}
