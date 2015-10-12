/**
 * 类测试
 * 定义类，各种类型的成员
 */
yugt.test = yugt.test || {};
//@import yugt.js
//@import common.js

yugt.test.SuperClass=function(){
    //闭包内的属性，被所有的ret实例共享，因此都属于静态私有，相当于ret的属性
    var proA;//静态私有属性A //此处不设置默认值
    var proB;//静态私有属性B

    var ret=function(){
        this.construct.apply(this, arguments);
    };
    ret.prototype={
        //constructor:ret,去掉原始的构造器
        //构造器
        construct:function(options){
            var _this=this;
            _this.options  = options || {};
            proA  = _this.options.proA || '1';//此处设置默认值
            proB  = _this.options.proB || '2';
        },
        //get,set方法
        getProA:function(){
            return proA;
        },
        setProA:function(val){
            proA=val;
        },
        getProB:function(){
            return proB;
        },
        setProB:function(val){
            proB=val;
        },
        //由于ret.prototype被所有的ret实例共享，因此ret.prototype内定义的属性都是静态的（但是不同于java的静态方法，js的静态方法里可以有this引用，而this又是动态绑定的，因此js的静态方法可以访问实例对象，这体现出了js的动态性）
        //静态公有方法A
        printA:function(){
//            alert(this.getProA());//这里的this指的是ret的实例，而不是ret.prototype对象
            //即：写外部调用的方法时，应该注意的是方法运行时环境，而不像写java代码注意的是编译时环境
//            alert(ret.prototype.getProA());//此时如果getProA方法里有this引用，那么指的是ret.prototype对象，而不是ret的实例
            //因此，由于一般方法中的this标示的是ret的实例，而不是ret.prototype，所以用this来调用内部成员
            var a=this.getProA();
            Y.println(a);
        	return a;
        }
    }

    return ret;
}();


yugt.test.testSuperClassA = function() {
	var superObj = new yugt.test.SuperClass({
				proA : 2
			});
	var superObj2 = new yugt.test.SuperClass();
	superObj.printA();// 弹出1
	superObj2.printA();//弹出1
}





yugt.test.SuperClassB=function(){
    //闭包内的属性，被所有的ret实例共享，因此都属于静态私有，相当于ret的属性
    var proA;//静态私有属性A //此处不设置默认值
    var proB;//静态私有属性B

    var ret=function(){
        this.construct.apply(this, arguments);
    };
    ret.prototype={
        //构造器
        construct:function(options){
    		var proNoStaA;//非静态私有属性A
    		var _options; //非静态私有属性
    		var _this=this;
			_this.getProNoStaA=function(){
				return proNoStaA;
			};
			_this.setProNoStaA=function(val){
				proNoStaA=val;
			}
			_this.getProNoStaA=function(){
				return proNoStaA;
			};
			_this.setProNoStaA=function(val){
				proNoStaA=val;
			}
            _options = options || {};
            proNoStaA = _options.proNoStaA || 'proNoStaA';//此处设置默认值
            proA  = _options.proA || 'proA';//此处设置默认值
            /*
                                 领悟：
            1.在ret.prototype中定义的函数中来访问this中的属性或方法，相当于使用了接口的性质
                                      因为this是动态绑定的，只有在执行期才检查方法是否存在，而在ret.prototype.getProA中访问的只是this的契约，即接口
            2.js的静态私有属性也很有用，因为js是单线程，不用担心同步问题，可以用来共享或传递多个实例对象中的数据
			3.定义类的static/private成员，是通过“闭包:定义类并运行的那个匿名函数”完成的；
	     	      定义类的unStatic/private成员，是通过“闭包:new一个实例对象时执行的那个构造函数”完成的。
             */
        },
        //get,set方法
        getProA:function(){
            return proA;
        },
        setProA:function(val){
            proA=val;
        },
        getProB:function(){
            return proB;
        },
        setProB:function(val){
            proB=val;
        },
        //静态公有方法A
        printA:function(){
            var a=this.getProA();
            Y.println(a);
        	return a;
        }
    }

    return ret;
}();

yugt.test.testSuperClassB = function() {
	var superBObj = new yugt.test.SuperClassB({
				proA : 2
			});
	var superBObj2 = new yugt.test.SuperClassB();
	superBObj.printA();
	superBObj2.printA();

	superBObj.setProNoStaA('proNoStaA');
	superBObj2.setProNoStaA('proNoStaA2');
	Y.println(superBObj.getProNoStaA());
	Y.println(superBObj2.getProNoStaA());
}










