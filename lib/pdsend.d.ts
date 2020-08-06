declare type Address = {
    port: string;
    host?: string;
    protocol?: 'tcp' | 'udp';
};
export default class Pdsend {
    name: string;
    address: Address;
    private process;
    constructor(address?: Address, name?: string);
    private getSpawnOptions;
    launchProcess(): void;
    hasProcess(): boolean;
    private static convertMessage;
    write(message: string): void;
    kill(): void;
}
export {};
//# sourceMappingURL=pdsend.d.ts.map