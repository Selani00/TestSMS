export interface WalletService{
    getBalance(id:number):Promise<any>;
}