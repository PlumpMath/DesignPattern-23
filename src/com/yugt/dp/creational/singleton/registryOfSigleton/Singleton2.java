package com.yugt.dp.creational.singleton.registryOfSigleton;


/**
 * 利用内部静态类实现单例模式
 * 由于内部静态类只会被加载一次，故该实现方式时线程安全的！
 * @author gangtaoyu
 *
 */
public class Singleton2  
{  
    private Singleton2(){ }  
      
    public static Singleton2 getInstance()  
    {  
        return Nested.instance;       
    }  
      
    //在第一次被引用时被加载  
    static class Nested  
    {  
        private static Singleton2 instance = new Singleton2();  
    }  
      
    public static void main(String args[])  
    {  
        Singleton2 instance = Singleton2.getInstance();  
        Singleton2 instance2 = Singleton2.getInstance();  
        System.out.println(instance == instance2);  
    }  
}  