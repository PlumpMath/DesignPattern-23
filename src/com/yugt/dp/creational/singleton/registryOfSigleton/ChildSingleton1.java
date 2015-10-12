package com.yugt.dp.creational.singleton.registryOfSigleton;

public class ChildSingleton1 extends Singleton {
    public ChildSingleton1() {
        // ....
        // 注册子类别物件
        register(getClass().getName(), this);
    }
}

