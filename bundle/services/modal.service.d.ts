export declare namespace Modal {
    interface IConfig {
        type?: "alert" | "confirm";
        showClose?: boolean;
        buttons?: {
            cancel?: {
                text?: string;
                type?: "link" | "default" | "primary" | "success" | "info" | "warning" | "danger";
            };
            ok?: {
                text?: string;
                type?: "link" | "default" | "primary" | "success" | "info" | "warning" | "danger";
            };
        };
    }
    class Service {
        private doc;
        constructor(doc: HTMLDocument);
        show(title: string, message: string, config?: IConfig): Promise<boolean>;
        private initModal(title, message, config?);
    }
}
