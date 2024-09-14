import {PlaceComment} from "./comment";

export type SinglePlace =
{
    _id: string;
    name: string;
    pic: string;
    city: string;
    state: string;
    founded: string;
    cuisines: string;
    comments: PlaceComment[];
}
