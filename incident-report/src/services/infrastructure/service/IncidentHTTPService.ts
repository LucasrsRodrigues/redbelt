import { AxiosResponse } from "axios";
import api from "../http/api";

interface IListDTO { }
interface IShowDTO { }
interface ICreateDTO { }

interface IIncidentHTTPService {
  list: () => Promise<AxiosResponse>;
  show: (data: IShowDTO) => Promise<AxiosResponse>;
  create: (data: ICreateDTO) => Promise<AxiosResponse>;
}

const IncidentHTTPService: IIncidentHTTPService = {
  list: function (): Promise<AxiosResponse> {
    return api.get("/incidents");
  },
  show: function (data: IShowDTO): Promise<AxiosResponse> {
    throw new Error("Function not implemented.");
  },
  create: function (data: ICreateDTO): Promise<AxiosResponse> {
    return api.post("/incidents", data);
  }
}

export default IncidentHTTPService;