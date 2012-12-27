package com.yugt.dp.creational.builder;

public class Main {
	public static void main(String[] args){
		ConcreteBuilder builder = new ConcreteBuilder();
		Director director = new Director( builder );

		director.construct();
		@SuppressWarnings("unused")
		Product product = builder.getResult();

	}
}
