import { IItemOfResolveTableToName } from "../../list/IItemOfResolveTableToName";
import { IReceivedDataAtClient } from "../transmissionBase";



export interface IReceivedDataAtClient_getlist<T extends IItemOfResolveTableToName> extends IReceivedDataAtClient {
    result: T[];
}
