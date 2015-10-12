package com.yugt.dp.scriptEngine;

import javax.script.*;
import java.util.*;
import java.io.*;
//这个类像java.util.Properties ,但是允许属性值执行javascript表达式
public class Configuration {
    Map<String,Object> defaults = new HashMap<String,Object>();
    //在map中获取和设置值的方法
    public Object get(String key){
        return defaults.get(key);
    }
    public void put(String key,Object value){
        defaults.put(key, value);
    }
    //从map的name/value对中获取初始化内容。如果一个值在大括号内，表示是一个javascript脚本，计算它
    public void load(String filename) throws IOException,ScriptException{
        //获得javascript编译器
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByExtension("js");

        //使用我们的name/value对（即javascript变量）
        Bindings bindings = new SimpleBindings(defaults);
        //创建一个变量，用于存放脚本执行的内容
        ScriptContext context  = new SimpleScriptContext();
        //设置那些Bindings 在Context 中，使它们可读。但这样的变量定义的脚本不要放入我们的Map中
        context.setBindings(bindings, ScriptContext.GLOBAL_SCOPE);
        BufferedReader in  = new BufferedReader(new FileReader(filename));
        String line;
        while((line=in.readLine())!=null){
            line = line.trim();
            if(line.length()==0) continue;//跳过空行
            if(line.charAt(0)=='#')continue;//跳过命令
            int pos = line.indexOf(":");
            if(pos == -1){
                throw new IllegalArgumentException("syntax:"+line);
            }
            String name = line.substring(0,pos).trim();
            String value= line.substring(pos+1).trim();
            char firstchar = value.charAt(0);
            int len = value.length();
            char lastchar = value.charAt(len-1);
            if(firstchar=='"'&&lastchar=='"'){
                //双引号引用的值为字符串
                defaults.put(name, value.substring(1,len-1));
            }else if(Character.isDigit(firstchar)){
                //如果开始是一个数字
                try{
//                    double d = Double.parseDouble(value);
                    defaults.put(name, value);
                }catch (NumberFormatException e) {
                    //没有数字，是一个string
                    defaults.put(name, value);
                }
            }else if("true".equals(value)){//处理布尔值
                defaults.put(name,Boolean.TRUE);
            }else if("false".equals(value)){
                defaults.put(name, Boolean.FALSE);
            }else if("null".equals(value)){//处理null值
                defaults.put(name, null);
            }else if(firstchar=='{'&&lastchar=='}'){
                //如果值是在一对大括号之内，则执行javascript代码
                String script = value.substring(1,len-1);
                Object result = engine.eval(script,context);
                defaults.put(name, result);
            }else{
                //其它情况，刚好是一个字符串
                defaults.put(name, value);
            }
        }
    }
    //一个简单的类的测试程序
    public static void main(String[] args) throws IOException,ScriptException{
        Configuration defaults = new Configuration();
        defaults.load(args[0]);
        Set<Map.Entry<String, Object>> entryset = defaults.defaults.entrySet();
        for(Map.Entry<String, Object> entry:entryset){
            System.out.printf("%s:%s%n",entry.getKey(),entry.getValue());
        }
    }
}
