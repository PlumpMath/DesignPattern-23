package com.yugt.dp.behavioral.interpreter;

import java.io.*;

import com.yugt.dp.behavioral.interpreter.node.INode;
import com.yugt.dp.behavioral.interpreter.node.imp.ProgramNode;


public class Main {
	public static void main(String[] args) {
		try {
			BufferedReader reader = new BufferedReader(new FileReader(args[0]));
			String text;
			while ((text = reader.readLine()) != null) {//文件内容为：每行都包含一个根节点
				System.out.println("text = \"" + text + "\"");
				INode node = new ProgramNode();
				node.parse(new Context(text));
				node.execute();
			}
		} catch (ArrayIndexOutOfBoundsException e) {
			System.err.println("Useage: java Main yourprogram.txt");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
