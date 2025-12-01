export interface OrderInfo{
  id: string,
  name: string,
  quantity: number,

  //stage 1
  customer: string;
  ETA: string;
  note?:string;

  //stage 2
  // TODO: note should be still accessible here
  processingId?: string;
  progress?: number;

  //stage 3
  
  //note is still accessible here

  trackingNumber?:string;
  destination?:string;
  shippedDate?:string;

  status: OrderStatus;
}

export enum OrderStatus{
  ORDERING = 'Ordered',
  PROCESSING = 'Processing',
  SHIPPING = 'Shipped',
  INACTIVE = 'inactive'
}

export const defaultBlank: OrderInfo = {
  id: "",
  name: "",
  quantity: 0,

  customer: "",
  ETA: "",
  note:"",

  trackingNumber:"",
  destination:"",
  shippedDate:"",
  status: OrderStatus.SHIPPING
}

