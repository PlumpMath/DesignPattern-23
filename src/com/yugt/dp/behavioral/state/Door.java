package com.yugt.dp.behavioral.state;

import java.util.Observable;

import com.yugt.dp.behavioral.state.status.DoorState;
import com.yugt.dp.behavioral.state.status.imp.DoorClosed;
import com.yugt.dp.behavioral.state.status.imp.DoorOpen;

/**
 * 包含各种状态的主体（传送门）
 * @author Administrator
 *
 */
public class Door extends Observable {
	// 按照类似方式定义DoorState类型的
	public final DoorState CLOSED = new DoorClosed(this);
	public final DoorState OPENING = new DoorOpen(this);
	public final DoorState OPEN = new DoorOpen(this);
	public final DoorState CLOSING = new DoorOpen(this);
	public final DoorState STAYOPEN = new DoorOpen(this);

	private DoorState currentState = CLOSED;// 当前状态

	protected void setState(DoorState state) {
		this.currentState = state;
		// setChanged();
		// notifyObservers();
	}

	public void complete() {

	}
	public void status() {

	}
	public void timeout() {

	}



	/**
	 * 去调用处于某种状态时的行为。
	 * 由于状态与行为已经绑定，所以此处不用if/else去判断选择不同的行为，而是直接调用相应状态的行为即可
	 */
	public void click() {
		currentState.click();
	}

}
