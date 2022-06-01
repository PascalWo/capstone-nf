import {Temperature} from "./Temperature";

export type Equipment = {
    id: number;
    name: string;
    localizedName: string;
    image: string;
    temperature?: Temperature;

}
