package com.yugt.dp.structural.decorator.decorator;

import com.yugt.dp.structural.decorator.IComponent;

/**
 * 抽象装饰者
 * @author mouca.he
 *
 */
public abstract class Decorator implements IComponent{

    private IComponent component;

    public Decorator(IComponent component){
        this.component = component;
    }
    /**
     * 组件方法执行前预处理方法
     *
     */
    protected void preSay(){};

    /**
     * 组件方法执行后处理方法
     *
     */
    protected void afterSay(){};

    public void operation(){

        preSay();
        component.operation();
        afterSay();

    };
}
