import eventBus from "./event-bus.js";

import { AppEvent } from "./event.interface.js";

export default class EventService {
  emit(event: AppEvent) {
    event.createdAt = new Date();

    eventBus.emit(event.type, event);
  }
}