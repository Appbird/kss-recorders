import { IReceivedDataAtServer_pickUp_UseSIdMIdId } from "../../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdMIdId";
import { IReceivedDataAtServer_pickUp_UseSIdId } from "../../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdId";
import { IReceivedDataAtServer_pickUp_UseId } from "../../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseId";
import { IItemOfResolveTableToName } from "../../../type/list/IItemOfResolveTableToName";
import { InterfaceOfRecordDatabase } from "../../type/InterfaceOfRecordDatabase";
import { IReceivedDataAtClient_pickUp } from "../../../type/api/list/IReceivedDataAtClient_pickUp";
 
async function pickUp_UseId<T extends IItemOfResolveTableToName>(input:IReceivedDataAtServer_pickUp_UseId, searchFunc:(id:string)=>Promise<T>):Promise<IReceivedDataAtClient_pickUp<T>>{
    return {isSucceeded:true,result: await searchFunc(input.id)}
}
async function pickUp_UseSIdId<T extends IItemOfResolveTableToName>(input:IReceivedDataAtServer_pickUp_UseSIdId, searchFunc:(gameSystemID:string,id:string)=>Promise<T>):Promise<IReceivedDataAtClient_pickUp<T>>{
    return {isSucceeded:true,result:await searchFunc(input.gameSystemEnv.gameSystemID,input.id)}
}
async function pickUp_UseSIdMIdId<T extends IItemOfResolveTableToName>(input:IReceivedDataAtServer_pickUp_UseSIdMIdId, searchFunc:(gameSystemID:string,gameModeID:string,id:string)=>Promise<T>):Promise<IReceivedDataAtClient_pickUp<T>>{
    return {isSucceeded:true,result:await searchFunc(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.id)}
}

export const gameSystem    = (database:InterfaceOfRecordDatabase,input:IReceivedDataAtServer_pickUp_UseId) =>  pickUp_UseId(input,(id) => database.getGameSystemInfo(id))
export const runner        = (database:InterfaceOfRecordDatabase,input:IReceivedDataAtServer_pickUp_UseId) =>  pickUp_UseId(input,(id) => database.getRunnerInfo(id))

export const gameMode    = (database:InterfaceOfRecordDatabase,input:IReceivedDataAtServer_pickUp_UseSIdId) =>  pickUp_UseSIdId(input,(s,id) => database.getGameModeInfo(s,id))
export const hashTag       = (database:InterfaceOfRecordDatabase,input:IReceivedDataAtServer_pickUp_UseSIdId) =>  pickUp_UseSIdId(input,(s,id) => database.getHashTagInfo(s,id))

export const target        = (database:InterfaceOfRecordDatabase,input:IReceivedDataAtServer_pickUp_UseSIdMIdId) =>  pickUp_UseSIdMIdId(input,(s,m,id) => database.getTargetInfo(s,m,id))
export const ability      = (database:InterfaceOfRecordDatabase,input:IReceivedDataAtServer_pickUp_UseSIdMIdId) =>  pickUp_UseSIdMIdId(input,(s,m,id) => database.getAbilityInfo(s,m,id))
export const difficulty   = (database:InterfaceOfRecordDatabase,input:IReceivedDataAtServer_pickUp_UseSIdMIdId) =>  pickUp_UseSIdMIdId(input,(s,m,id) => database.getGameDifficultyInfo(s,m,id))
