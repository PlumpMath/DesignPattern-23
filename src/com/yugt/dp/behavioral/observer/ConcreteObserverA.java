package com.yugt.dp.behavioral.observer;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;

/**
 * 具体观察者A
 * 普通学生
 * @author Administrator
 *
 */
public class ConcreteObserverA implements Observer {
	Subject subject;
	File myFile;

	public ConcreteObserverA(Subject subject, String fileName) {
		this.subject = subject;
		subject.addObserver(this); // 使当前实例成为subject所引用的具体主题的观察者
		myFile = new File(fileName);
	}

	public void hearTelephone(String heardMess) {
		try {
			RandomAccessFile out = new RandomAccessFile(myFile, "rw");
			out.seek(out.length());
			byte[] b = heardMess.getBytes();
			out.write(b); // 更新文件中的内容
			System.out.print("我是一个大学生,");
			System.out.println("我向文件" + myFile.getName() + "写入如下内容:");
			System.out.println(heardMess);
		} catch (IOException exp) {
			System.out.println(exp.toString());
		}
	}
}
