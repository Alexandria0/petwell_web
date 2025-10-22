export enum ProfileTypeEnum {
  Customer = "customer",
  Business = "business",
}

export interface IProfileType {
  type: ProfileTypeEnum;
}
