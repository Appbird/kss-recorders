import { IReceivedDataAtServer } from "../../transmissionBase";



export interface IReceivedDataAtServer_getlist_UseSIdId extends IReceivedDataAtServer {
    gameSystemEnv: { gameSystemID: string; };
    id?: string[];
    start?: number;
    limit?: number;
}
