import {z} from "zod";
import {serviceSchema} from "../validations/service.schema";
import {API_BASE_URL} from "../../common/constants";
import {getCookie} from "cookies-next";

// export interface ServiceResponse {
//   title?: string;
//   status?: number;
//   errors?: Record<string, string>;
//   success: boolean;
//   message: string;
// }

export async function createService(
  serviceData: z.infer<typeof serviceSchema>
): Promise<unknown> {
  try {
    const validatedData = serviceSchema.parse(serviceData);

    const response = await fetch(
      `${API_BASE_URL}/api/services/create-service`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + (getCookie("token") || ""),
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(validatedData),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Service creation failed:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "A apărut o eroare la crearea serviciului",
    };
  }
}
