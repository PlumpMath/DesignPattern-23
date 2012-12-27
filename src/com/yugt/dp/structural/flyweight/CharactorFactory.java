package com.yugt.dp.structural.flyweight;

import java.util.Hashtable;

/**
 * 享元工厂（单例的，用来创建和维护享元）
 * @author Administrator
 *
 */
public class CharactorFactory {
	// Fields
	private Hashtable<Character, Charactor> charactors = new Hashtable<Character, Charactor>();

	private static CharactorFactory instance;

	// Constructor
	private CharactorFactory() {
		charactors.put('A', new CharactorA());
		charactors.put('B', new CharactorB());
		charactors.put('C', new CharactorC());
	}

	public CharactorFactory getInstance() {
		if (instance != null) {
			instance = new CharactorFactory();
		}
		return instance;
	}

	// Method
	public Charactor GetCharactor(char key) {
		Charactor charactor = charactors.get(key);

		if (charactor == null) {
			switch (key) {
			case 'A':
				charactor = new CharactorA();
				break;
			case 'B':
				charactor = new CharactorB();
				break;
			case 'C':
				charactor = new CharactorC();
				break;
			}
			charactors.put(key, charactor);
		}
		return charactor;
	}
}
