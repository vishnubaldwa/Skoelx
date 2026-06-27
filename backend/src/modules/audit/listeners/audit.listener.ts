import eventBus from "../../../core/events/event-bus.js";

import { EventType } from "../../../core/events/event.constants.js";

import AuditService from "../services/audit.service.js";

const auditService = new AuditService();

Object.values(EventType).forEach((eventType) => {
  eventBus.on(eventType, async (event) => {
    try {
      await auditService.log({
        userId: event.userId,
        module: event.module,
        action: event.action,
        referenceId: event.referenceId,
        ipAddress: event.ipAddress,
        requestId: event.requestId,
      });
    } catch (error) {
      console.error("Audit listener failed:", error);
    }
  });
});