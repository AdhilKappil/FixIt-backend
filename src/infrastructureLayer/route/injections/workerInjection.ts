import { WorkerAdapter } from "../../../controllerLayer/workerAdapter";
import { WorkerUseCase } from "../../../usecaseLayer/usecase/workerUseCase";
import WorkerModel from "../../database/model/workerModel";
import { WorkerRepository } from "../../database/repository/workerRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";


// factory pattern
const workerRepository = new WorkerRepository(WorkerModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const requestValidator = new RequestValidator();
const workerusecase = new WorkerUseCase(
  workerRepository,
  bcrypt,
  jwt,  
  requestValidator
);
const workerAdapter = new WorkerAdapter(workerusecase);

export { workerAdapter, workerRepository};