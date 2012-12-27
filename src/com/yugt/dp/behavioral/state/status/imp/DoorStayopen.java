package com.yugt.dp.behavioral.state.status.imp;

import com.yugt.dp.behavioral.state.Door;
import com.yugt.dp.behavioral.state.status.DoorState;

public class DoorStayopen extends DoorState {
	public DoorStayopen(Door door) {
		super(door);
	}

	public void click() {
		// door.setState(door.STAYOPEN);
	}

	public void timeout() {
		// door.setState(door.CLOSING);
	}
}
