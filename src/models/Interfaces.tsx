export interface OrderInfo{
  id: string,
  name: string,
  quantity: number,

  //stage 1
  customer: string;
  ETA: string;

  //stage 2
  note?:string;
  materialUsed?: string[];
  progress?: number;

  //stage 3
  trackingNumber?:string;
  destination?:string;
  shippedDate?:string;

  status: OrderStatus;
}

export enum OrderStatus{
  ORDERING = 'Ordered',
  PROCESSING = 'Processing',
  SHIPPING = 'Shipped',
}