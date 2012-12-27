package com.yugt.dp.scriptEngine;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.script.Bindings;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;


//Mozilla Rhino是一个完全使用Java语言编写的开源JavaScript实现
//Rhino 提供了如下功能： 　　
//● 对 JavaScript 1.5 的完全支持 　　
//● 直接在 Java 中使用 JavaScript 的功能 　　
//● 一个 JavaScript shell，用于运行 JavaScript 脚本 　　
//● 一个 JavaScript 的编译器，用于将 JavaScript 编译成 Java 二进制文件

//浏览器内核(包括脚本引擎、html解析、css渲染)：Trident；Gecko；Presto；Webkit；

/**
 * 服务器端脚本
 */
public class RunScriptTemp {
	public final static String jsFile="js/com/yugt/dp/script/yugt.js";
	public final static String jsFile2="js/com/yugt/dp/script/extend.js";

	public final static String pack="js/com/yugt/dp/script";


    public static void main(String[] args) throws IOException{
        ScriptEngineManager scriptManager = new ScriptEngineManager();//得到解释器的管理器，里面有很多种脚本解释器
        ScriptEngine js = scriptManager.getEngineByExtension("js");//从管理器中获取js的解释器
        //定义我们要运行的脚本文件
        String filename = null;
        //通过解释器来获得存储javascript变量的Bindings的实例，使它们提供给脚本。
        Bindings bindings = js.createBindings();
        //处理参数，参数是定义的脚本的变量。参数可能包括-Dname/value对。我们要进行处理，任何参数不能以‘-D’为文件名开始
//        for(int i = 0;i<args.length;i++){
//            String arg = args[i];
//            if(arg.startsWith("-D")){//如果参数是以“-D”开头，则进行处理
//                int pos = arg.indexOf('=');
//                if(pos == -1) usage();
//                String name=arg.substring(2,pos);
//                String value= arg.substring(pos+1);
//                //注意：我们定义的所有的变量是字符串，如果必要的话，我们可以通过java.lang.Number ，一个java.lang.Boolean，任何Java对象或NULL，将脚本转换为其他类型。
//                bindings.put(name, value);//脚本中的变量存入bindings实例中
//            }else{
//                if(filename!=null)usage();
//                filename=arg;
//            }
//        }
//        //这里是为了确保我们得到了一个文件的参数。
//        if(filename==null){
//            usage();
//        }
        filename=jsFile;
        //增加一个具有约束力的使用特殊的保留变量名称，告诉脚本引擎的文件的名称将执行。这使它能够提供更好的错误信息
        bindings.put(ScriptEngine.FILENAME, filename);


        //读取文件的流
//        Reader in = new FileReader(filename);
        try{
            //执行脚本并取得结果。注意in就相当于js中的脚本，而bindings是脚本执行所需要的变量
//            Object result = js.eval(in,bindings);//脚本的最后一个表单式的结果，即js引擎执行的result
//            System.out.println(result);

//java与javascript互通
//testScriptVariables(js);
//testInvokeScriptMethod(js);
//testScriptInterface(js);
//testUsingJDKClasses(js);

//        	js.eval(in);//带bindings的eval不能找到需要执行的方法
//        	js.eval(new FileReader(jsFile2));

        	loadJsFile(js,pack,false);

            Invocable inv = (Invocable) js;
            String ret = (String)inv.invokeFunction("main", "" );//返回值
            System.out.println("ret:"+ret);



        }catch(ScriptException ex){
            //执行过程中出异常则显示一个错误信息
            System.out.println(ex);
        } catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
    }
    static void usage(){
        System.err.println("Usage: java RunScript[-Dname=value...] script.js");
        System.exit(1);//异常退出程序。如果正常退出程序用System.exit(0);
    }


    /**
     * 指定js引擎从指定包里加载js文件
     * @param js
     * @param packageName
     * @param isContainSubPackage 是否包含子目录
     */
    private static void loadJsFile(ScriptEngine js,String packageName,Boolean isContainSubPackage){
    	List<File> lst=new ArrayList<File>();
    	File dir=new File(packageName);
    	lst=scanFile(dir,isContainSubPackage);

		try {
			for (File f : lst) {
				js.eval(new FileReader(f));
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (ScriptException e) {
			e.printStackTrace();
		}
    }

    private static List<File> scanFile(File directory,Boolean isContainSubPackage){
    	List<File> lst=new ArrayList<File>();
    	File[] files=directory.listFiles();
    	if(isContainSubPackage){
        	for(File f:files){
        		if(!f.isDirectory()){
        			lst.add(f);
        		}else{
        			scanFile(f,isContainSubPackage);
        		}
        	}
    	}else{
    		for(File f:files){
    			if(!f.isDirectory()){
    				lst.add(f);
    			}
    		}
    	}
    	return lst;
    }


    /**
     * 演示如何暴露Java对象为脚本语言的全局变量
     * @param engine
     * @throws ScriptException
     */
    public static void testScriptVariables(ScriptEngine engine) throws ScriptException{
        File file = new File("test.txt");
       engine.put("f", file);
       engine.eval("println('Total Space:'+f.getTotalSpace())");
    }

    /**
     * 演示如何在Java中调用脚本语言的方法
     * @param engine
     * @throws NoSuchMethodException
     * @throws ScriptException
     */
    public static void testInvokeScriptMethod(ScriptEngine engine) throws ScriptException, NoSuchMethodException{
       String script = "function hello(name) { return 'Hello,' + name;}";
       engine.eval(script);
       Invocable inv = (Invocable) engine;
       String res = (String)inv.invokeFunction("hello", "Scripting" );
       System.out.println("res:"+res);
   }

    /**
     * 演示脚本语言如何实现Java的接口
     * @param engine
     * @throws ScriptException
     */
    public static void testScriptInterface(ScriptEngine engine) throws ScriptException{
       String script = "var obj = new Object(); obj.run = function() { println('run method called'); }";
       engine.eval(script);
       Object obj = engine.get("obj");
       Invocable inv = (Invocable) engine;
       Runnable r = inv.getInterface(obj,Runnable.class);
       Thread th = new Thread(r);
       th.start();
    }

    /**
     * 演示脚本语言如何使用JDK平台下的类
     * @param engine
     * @throws NoSuchMethodException
     * @throws ScriptException
     */
    public  void testUsingJDKClasses(ScriptEngine engine) throws ScriptException, NoSuchMethodException{
       //Packages是脚本语言里的一个全局变量,专用于访问JDK的package
       String js = "function doSwing(t){var f=new Packages.javax.swing.JFrame(t);f.setSize(400,300);f.setVisible(true);}";
       engine.eval(js);
       Invocable inv = (Invocable) engine;
       inv.invokeFunction("doSwing", "Scripting Swing" );
   }

    //jrunscript
    //SUN提供的JDK6中有一个命令行工具jrunscript，
    //你可以在<JDK6_Home>/bin下面找到这个工具，
    //jrunscript是一个脚本语言的解释程序，它独立于脚本语言，但默认是用JavaScript，我们可以用jrunscript来测试自己写的脚本语言是否正确
}
