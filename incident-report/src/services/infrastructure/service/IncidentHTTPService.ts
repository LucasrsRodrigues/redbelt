import { AxiosResponse } from "axios";
import api from "../http/api";

interface IListDTO { }
interface IShowDTO { }
interface ICreateDTO { }
interface IUpdateDTO { }

interface IIncidentHTTPService {
  list: () => Promise<AxiosResponse>;
  show: (data: IShowDTO) => Promise<AxiosResponse>;
  create: (data: ICreateDTO) => Promise<AxiosResponse>;
  delete: (id: string) => Promise<AxiosResponse>;
  update: (id: string, data: IUpdateDTO) => Promise<AxiosResponse>;
}

const IncidentHTTPService: IIncidentHTTPService = {
  list: function (): Promise<AxiosResponse> {
    return api.get("/incidents");
  },
  show: function (data: IShowDTO): Promise<AxiosResponse> {
    throw new Error("Function not implemented.");
  },
  create: function (data: ICreateDTO): Promise<AxiosResponse> {

    return api.post("/incidents", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  delete: function (id: string): Promise<AxiosResponse> {
    return api.delete(`/incidents/${id}`);
  },
  update: function (id: string, data: IUpdateDTO): Promise<AxiosResponse> {
    return api.post(`/incidents/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default IncidentHTTPService;