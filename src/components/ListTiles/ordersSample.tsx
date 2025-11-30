import { OrderInfo, OrderStatus } from "../../models/Interfaces";

export const testSamples:OrderInfo[] = [
  { 
    id: "fhbsafasdgfi",
    name: "220 Ohms Resistor",
    quantity: 400,
  
    //stage 1
    customer: "Cristian",
    ETA: new Date(2025,12,13,12).toISOString(),

    status: OrderStatus.ORDERING
  },

  { 
    id: "srearadf",
    name: "16v 1000uf Capacitors",
    quantity: 300,
  
    //stage 1
    customer: "Crystian",
    ETA: new Date(2025,12,15,12).toISOString(),

    status: OrderStatus.ORDERING
  },

  { 
    id: "gdgdhaagf",
    name: "Female to Female Jumperwires",
    quantity: 40,
  
    //stage 1
    customer: "Xristian",
    ETA: new Date(2025,12,14,12).toISOString(),

    status: OrderStatus.ORDERING
  },
];