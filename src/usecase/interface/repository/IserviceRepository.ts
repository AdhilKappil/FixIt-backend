import { IService } from "../../../domain/service";


export interface IServiceRepository {
    createService(newService: IService): Promise<string>;
    findService(email: string): Promise<IService | null>;
    editService(updateService:IService): Promise<string>;
}