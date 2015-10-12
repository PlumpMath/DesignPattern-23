package com.yugt.dp.creational.singleton.registryOfSigleton;

import java.util.HashMap;
import java.util.Map;

public class Singleton {
	// 注册表，用于注册子类别物件
	private static Map<String,Singleton> registry = new HashMap<String,Singleton>();
	private static Singleton instance;

	public static void register(String name, Singleton singleton) {
		registry.put(name, singleton);
	}

	public static Singleton getInstance() {
		if (instance == null) {
			// getEnv表示取得环境变数
			String style = new String("style");
			instance = lookup(style);
		}

		return instance;
	}

	protected static Singleton lookup(String name) {
		return (Singleton) registry.get(name);
	}
}
