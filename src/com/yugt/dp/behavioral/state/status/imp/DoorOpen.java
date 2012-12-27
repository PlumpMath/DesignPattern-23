package com.yugt.dp.behavioral.state.status.imp;

import com.yugt.dp.behavioral.state.Door;
import com.yugt.dp.behavioral.state.status.DoorState;

public class DoorOpen extends DoorState {
	public DoorOpen(Door door) {
		super(door);
	}

	public void click() {
		// door.setState(door.STAYOPEN);
	}

	public void timeout() {
		// door.setState(door.CLOSING);
	}
}
