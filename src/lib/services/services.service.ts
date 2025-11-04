import {API_BASE_URL} from "../../common/constants";
import {ApiResponse, IService} from "../interfaces/IService";
import {getCookie} from "cookies-next";

export async function getServices(): Promise<{
  data: IService[];
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Services/get-services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (getCookie("token") || ""),
      },
    });

    const apiResponse: ApiResponse<IService[]> = await response.json();

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

export async function getMyServices(): Promise<{
  data: IService[];
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Services/my-services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (getCookie("token") || ""),
      },
    });

    const apiResponse: ApiResponse<IService[]> = await response.json();

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

export async function getServiceById(
  id: string
): Promise<{data: IService | null; error?: string}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/Services/get-service/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (getCookie("token") || ""),
        },
      }
    );

    const apiResponse: ApiResponse<IService> = await response.json();

    return {data: apiResponse.data};
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "A apărut o eroare la încărcarea serviciului",
    };
  }
}

export async function deleteService(
  id: string
): Promise<{success: boolean; message?: string; error?: string}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/Services/remove-service/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (getCookie("token") || ""),
        },
      }
    );

    const apiResponse: ApiResponse<null> = await response.json();

    return {success: apiResponse.success, message: apiResponse.message};
  } catch (error) {
    console.error("Failed to delete service:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "A apărut o eroare la ștergerea serviciului",
    };
  }
}
