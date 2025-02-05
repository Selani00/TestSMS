export interface ClientService{

    login(details:any):Promise<any>;

    register(details:any):Promise<any>;

    logout(details:any):Promise<any>;

    deleteClient(details:any):Promise<any>;

    sendSMS(details:any):Promise<any>;

}