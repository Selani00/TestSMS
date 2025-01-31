export interface ClientService{

    login(details:any):Promise<any>;

    register(details:any):Promise<any>;

    getWallet(id:number):Promise<any>;

    sendSMS(details:any):Promise<any>;

}