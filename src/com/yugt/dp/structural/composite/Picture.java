package com.yugt.dp.structural.composite;

import java.util.ArrayList;

/**
 * 复合元素
 * @author Administrator
 *
 */
 public class Picture extends Graphics
 {
     protected ArrayList<Graphics> picList = new ArrayList<Graphics>();//关键在于有此list用来保存其他的子组件

     Picture(String name){
    	 super(name);
     }

     public void Draw()
     {
         System.out.println("Draw a" + _name);

         for(Graphics g: picList){
             g.Draw();
         }
     }

     public void Add(Graphics g)
     {
         picList.add(g);
     }
     public void Remove(Graphics g)
     {
         picList.remove(g);
     }
 }
