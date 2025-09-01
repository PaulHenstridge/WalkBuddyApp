import { Dog } from "./dog"
import { Location } from "./location"
// import {DogReport } from "./"


export interface Walk{
    id: string
    locationId: String
    locationName:String
    dateTime: string
    dogs: Dog[]
    complete:boolean
    report: String
}