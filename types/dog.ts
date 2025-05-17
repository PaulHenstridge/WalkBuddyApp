import { Owner } from "./owner"


export interface Dog {
    id: number
    name: string
    breed: string
    description: string
    owner: Owner
    notes: string   
  }