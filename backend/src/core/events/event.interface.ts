export interface AppEvent {
  type: string;

  userId?: string;

  referenceId?: string;

  module: string;

  action: string;

  metadata?: Record<string, unknown>;

  ipAddress?: string;

  requestId?: string;

  createdAt?: Date;
}