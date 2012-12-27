package com.yugt.dp.structural.decorator;

import com.yugt.dp.structural.decorator.decorator.BorderDecorator;
import com.yugt.dp.structural.decorator.decorator.ScrollDecorator;

public class Main {
    /**
     * 测试方法
     * @param args
     */
    public static void main(String[] args) {
        // TODO 自动生成方法存根
        IComponent interfaceComponent = new BorderDecorator(new ScrollDecorator(new ConcreteComponent()));
        interfaceComponent.operation();
        /*
         * 控制台输出：
         * DecoratorTwo.preSay():装饰者二的preSay()方法！
         * DecoratorOne.preSay():装饰者一的preSay()方法！
         * Component.operation():原组件的方法！
         * DecoratorOne.afterSay():装饰者一的afterSay()方法！
         * DecoratorTwo.afterSay():装饰者二的afterSay()方法！
         */
    }
}
