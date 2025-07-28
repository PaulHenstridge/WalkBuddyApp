import { Dog } from "./dog"
import { Location } from "./location"
// import {DogReport } from "./"


export interface Walk{
    id: string
    dateTime: string
    location: Location
    dogs: Dog[]
    complete:boolean
    // report: DogReport

}