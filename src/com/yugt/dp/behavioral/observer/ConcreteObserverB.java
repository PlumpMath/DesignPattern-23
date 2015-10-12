package com.yugt.dp.behavioral.observer;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;

/**
 * 具体观察者B
 * 海归学生
 * @author Administrator
 *
 */
public class ConcreteObserverB implements Observer {
	Subject subject;
	File myFile;

	public ConcreteObserverB(Subject subject, String fileName) {
		this.subject = subject;
		subject.addObserver(this); // 使当前实例成为subject所引用的具体主题的观察者
		myFile = new File(fileName);
	}

	public void hearTelephone(String heardMess) {
		try {
			boolean boo = heardMess.contains("java程序员")
					|| heardMess.contains("软件");
			if (boo) {
				RandomAccessFile out = new RandomAccessFile(myFile, "rw");
				out.seek(out.length());
				byte[] b = heardMess.getBytes();
				out.write(b);
				System.out.print("我是一个海归,");
				System.out.println("我向文件" + myFile.getName() + "写入如下内容:");
				System.out.println(heardMess);
			} else {
				System.out.println("我是海归,这次的信息中没有我需要的信息");
			}
		} catch (IOException exp) {
			System.out.println(exp.toString());
		}
	}
}
