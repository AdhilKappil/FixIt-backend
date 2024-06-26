import { ServiceAdapter } from "../../../controllers/serviceAdapter";
import { ServiceUseCase } from "../../../usecase/usecase/serviceUseCase";
import ServiceModel from "../../database/model/serviceModel";
import { ServiceRepository } from "../../database/repository/serviceRepository";
import RequestValidator from "../../services/validateRepository";


// creating injection to provide the route
const serviceRepository = new ServiceRepository(ServiceModel);
const requestValidator = new RequestValidator();
const serviceusecase = new ServiceUseCase(serviceRepository, requestValidator);
const serviceAdapter = new ServiceAdapter(serviceusecase);


export { serviceAdapter };
