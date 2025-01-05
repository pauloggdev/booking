import { v4 as uuid4 } from 'uuid'
export default class Room{
    constructor(readonly uuid:string, readonly type:string, readonly price:number){}
    static create(type:string, price:number){
        const uuid = uuid4().toString();
        return new Room(uuid, type, price);
    }
}