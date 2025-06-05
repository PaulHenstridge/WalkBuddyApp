import { Dog } from "./dog"
import { Location } from "./location"


export interface Walk{
    id: string
    dateTime: string
    location: Location
    dogs: Dog[]
    complete:boolean

}