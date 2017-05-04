export interface IFormData {
    readonly username: string;
    readonly password: string;
}
export declare class MyModuleMainPageComponent {
    formData: IFormData;
    private origData;
    constructor();
    onLogin(): void;
    onCancel(): void;
}
