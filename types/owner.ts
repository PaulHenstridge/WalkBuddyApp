import { ContactDetails } from "./contactDetails"
import { Dog } from "./dog"

export interface Owner {
    id:number
    name: string
    contactDetails: ContactDetails
    dogs: Dog[]
    notes: string
}