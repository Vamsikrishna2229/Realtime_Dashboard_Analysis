<%@page import="java.io.*,java.sql.*"%>
<%
String unixCommand = "sh /Library/Tomcat/webapps/ROOT/realtime_report/sh/placed_json/jb_gistportal_json_realtime_placed_PST_run.sh";
         
        Runtime rt = Runtime.getRuntime();      
        try {
            rt.exec(unixCommand);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
%>