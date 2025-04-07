import HttpClient from "@/services/HttpClient";
import PolymorphicHttpClient from "@/services/PolymorphicHttpClient";

abstract class Service {
  protected http = HttpClient.getInstance();
}

export abstract class ApiRouteService {
  protected http = PolymorphicHttpClient.getInstance();
}

export default Service;
