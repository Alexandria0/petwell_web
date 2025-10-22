import {API_BASE_URL} from "@/common/constants";
import {
  AuthResponse,
  SignInCredentials,
  SignUpCredentials,
} from "../interfaces/IAuth";
import {getCookie} from "cookies-next";

export async function signup(
  credentials: SignUpCredentials
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const data: AuthResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Signup failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function signin(
  credentials: SignInCredentials
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const data: AuthResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function chooseProfile(type: number): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/choose-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + (getCookie("token") || ""),
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({role: type}),
    });

    const data: AuthResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Signup failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
