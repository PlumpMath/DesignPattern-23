package com.yugt.dp.scriptEngine;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import sun.org.mozilla.javascript.internal.NativeObject;

/**
 * 服务器端脚本
 */
public class RunScript {
	public final static String Pack="js/com/yugt/dp/script";
	public final static String Main_Fun="main";

    public static void main(String[] args) throws IOException{
        ScriptEngineManager scriptManager = new ScriptEngineManager();//得到解释器的管理器，里面有很多种脚本解释器
        ScriptEngine js = scriptManager.getEngineByExtension("js");//从管理器中获取js的解释器
        try{
        	loadJsFile(js,Pack,true);
//        	System.out.println(js.get("yugt").getClass());
        	NativeObject yugt =(NativeObject)js.get("yugt");//每个js对象都实现Scriptable接口，本地js对象形如NativeObject、NativeArray、NativeString
        	NativeObject test =(NativeObject)NativeObject.getProperty(yugt, "test");
            Invocable inv = (Invocable) js;
            inv.invokeMethod(test, Main_Fun, "");
        }catch(ScriptException ex){
            //执行过程中出异常则显示一个错误信息
            System.out.println(ex);
        } catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
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
    	System.out.println("加载"+lst.size()+"个js文件：");
		try {
			for (File f : lst) {
				System.out.println(f.getPath());
				js.eval(new FileReader(f));//注意包的加载顺序
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (ScriptException e) {
			e.printStackTrace();
		}
		System.out.println("---------------------------------------------------------");
    }

    private static List<File> scanFile(File directory,Boolean isContainSubPackage){
    	List<File> lst=new ArrayList<File>();
    	File[] files=directory.listFiles();
    	if(files==null){
    		return lst;
    	}
    	if(isContainSubPackage){
        	for(File f:files){
        		if(!f.isDirectory() && isJsFile(f.getName())){
        			if("yugt.js".equals(f.getName())){//指定根文件加载顺序 TODO 可以提取一个js载入顺序函数
        				lst.add(0,f);
        			}else{
        				lst.add(f);
        			}
        		}else{
        			lst.addAll(scanFile(f,isContainSubPackage));
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
     * 判断文件是否是js
     * TODO 还可以做预编译功能
     * @param fileName
     * @return
     */
    private static boolean isJsFile(String fileName){
    	String fileSuffix=fileName.substring(fileName.length()-3, fileName.length());
    	return ".js".equals(fileSuffix);
    }

}
