export interface IService {
  id: string;
  userId: string;
  company: string;
  type: string;
  location: string;
  animal: string;
  description: string;
  prices: {
    name: string;
    price: number;
    currency: string;
  }[];
  contacts: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  specialities: {
    name: string;
  }[];
  doctor: string;
  comments: string | null;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  route: string;
  errors: unknown | null;
}
