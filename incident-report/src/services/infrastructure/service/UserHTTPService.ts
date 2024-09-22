import { AxiosResponse } from "axios";
import api from "../http/api";

interface ILoginDTO {
  email: string;
  password: string;
}

interface IRegisterDTO {
  name: string;
  email: string;
  password: string;
}

interface IUserHTTPService {
  login: (data: ILoginDTO) => Promise<AxiosResponse>;
  register: (data: IRegisterDTO) => Promise<AxiosResponse>;
}

const UserHTTPService: IUserHTTPService = {
  login: async function (data: ILoginDTO): Promise<AxiosResponse<any>> {
    return api.post("/login", data);
  },
  register: function (data: IRegisterDTO): Promise<AxiosResponse> {
    return api.post("/register", data);
  }
};

export default UserHTTPService;
