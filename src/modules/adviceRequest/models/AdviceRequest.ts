export enum Gender {
  Female = "female",
  Male = "male",
}

export interface AdviceRequest {
  name: string;
  phone: string;
  city: string;
  district: string;
  gender: Gender;
  products: (string | number)[];
  description: string;
}
