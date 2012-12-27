package com.yugt.dp.behavioral.chainOfResponsibility;

import java.io.*;

import com.yugt.dp.behavioral.chainOfResponsibility.handler.Handler;
import com.yugt.dp.behavioral.chainOfResponsibility.handler.imp.CharacterHandler;
import com.yugt.dp.behavioral.chainOfResponsibility.handler.imp.NumberHandler;
import com.yugt.dp.behavioral.chainOfResponsibility.handler.imp.SymbolHandler;

public class Main {
	public static void main(String[] args) throws IOException {
		Handler numberHandler = new NumberHandler();
		Handler characterHandler = new CharacterHandler();
		Handler symbolHandler = new SymbolHandler();
		numberHandler.setSuccessor(characterHandler);
		characterHandler.setSuccessor(symbolHandler);
		System.out.print("Press any key then return: ");
		char c = (char) System.in.read();
		numberHandler.handleRequest(c);
	}
}
