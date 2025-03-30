import HttpClient from "@/services/HttpClient";
import PolymorphicHttpClient from "@/services/PolymorphicHttpClient";

abstract class Service {
  protected http = HttpClient.getInstance();
}

export abstract class ApiRouteService {
  protected http = PolymorphicHttpClient.getInstance(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api`,
  );
}

export default Service;
