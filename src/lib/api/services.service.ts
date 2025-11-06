import {API_BASE_URL} from "../../common/constants";
import {ApiResponse, IService} from "../interfaces/IService";
import {getCookie} from "cookies-next";

interface GetServicesParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  type?: string;
  animal?: string;
  location?: string;
}

export async function getServices(params?: GetServicesParams): Promise<{
  data: IService[];
  totalCount?: number;
  totalPages?: number;
  currentPage?: number;
  error?: string;
}> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.pageSize)
      queryParams.set("pageSize", params.pageSize.toString());
    if (params?.searchTerm) queryParams.set("SearchTerm", params.searchTerm);
    if (params?.type) queryParams.set("Type", params.type);
    if (params?.animal) queryParams.set("Animal", params.animal);
    if (params?.location) queryParams.set("Location", params.location);

    const url = `${API_BASE_URL}/api/services/get-services${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const apiResponse: ApiResponse<{
      items: IService[];
      totalCount: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
    }> = await response.json();

    return {
      data: apiResponse.data?.items || [],
      totalCount: apiResponse.data?.totalCount,
      totalPages: apiResponse.data?.totalPages,
      currentPage: apiResponse.data?.currentPage,
    };
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
    const response = await fetch(`${API_BASE_URL}/api/services/my-services`, {
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
      `${API_BASE_URL}/api/services/get-service/${id}`,
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
      `${API_BASE_URL}/api/services/delete-service/${id}`,
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
