import { Owner } from "./owner"


export interface Dog {
    id: number
    name: string
    breed: string
    description: string
    dateOfBirth: string
    owner: Owner
    notes: string   
  }