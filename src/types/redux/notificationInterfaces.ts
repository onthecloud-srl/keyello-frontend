type CommandType = "server" | "service" | "hetzner" | "generic";

type AlertType = "error" | "warning" | "info" | "success";

export type Alert = {
 id: string;
 message: string;
 timestamp: number;
 type?: AlertType;
};

export type Command = {
 id: string;
 type: CommandType;
 command: string;
 url?: string;
 params?: Record<string, unknown>;
};

export interface INotification {
 commands: Command[];
 alerts: Alert[];
}
