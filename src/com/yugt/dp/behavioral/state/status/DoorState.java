package com.yugt.dp.behavioral.state.status;

import com.yugt.dp.behavioral.state.Door;

/**
 * 抽象状态（传送门状态）
 * @author Administrator
 *
 */
public abstract class DoorState {
	protected Door door;//此处包含状态的主体door是为了：在任何一个状态内部都能控制door的状态，从而跳转到其他的状态去
	public DoorState(Door door) {
		this.door = door;
	}

	public String status() {
		return getClass().getSimpleName();
	}
	public void complete() {
	}
	public void timeout() {
	}


	/**
	 * 需要各个状态实现类实现的各自的“行为”
	 */
	public abstract void click();

}
