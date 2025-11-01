import {API_BASE_URL} from "../../common/constants";
import {ApiResponse, IService} from "../interfaces/IService";
import {getCookie} from "cookies-next";

export async function getServices(): Promise<{
  data: IService[];
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/services/get-services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (getCookie("token") || ""),
      },
    });

    const apiResponse: ApiResponse<IService[]> = await response.json();

    if (!apiResponse.success) {
      throw new Error(apiResponse.message || "Failed to fetch services");
    }

    return {data: apiResponse.data};
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return {
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "A apărut o eroare la încărcarea serviciilor",
    };
  }
}
