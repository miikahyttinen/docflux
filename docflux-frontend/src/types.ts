export type OrderDto = {
    customerInfo: CustomerInfo;
    orderInfo: OrderInfo;
  }
  
  export type CustomerInfo = {
    name: string;
    company?: string;
    addressOne: string;
    addressTwo?: string;
    email: string;
  }
  
  export type OrderInfo = {
    performer: string;
    location: string;
    timeOfDelivery: string;
    timeInfo?: string;
    delivery: string;
    priceEuro: number;
    priceInfo?: string;
    otherOne?: string;
    otherTwo?: string
  }
  
  export type Template = {
    uuid: string;
    title: string;
  }