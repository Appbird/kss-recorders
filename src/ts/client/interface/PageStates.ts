import {APIFunctions} from "../../type/api/relation"
import { IGameModeItemWithoutCollections } from "../../type/list/IGameModeItem";
import {IGameSystemInfoWithoutCollections } from "../../type/list/IGameSystemInfo";

export interface PageStates{
    //#NOTE それぞれのステートが初期条件として必要とするオブジェクトの型をここに記述する。
    none:undefined,
    errorView:{title:string,message:string}
    detailView:APIFunctions["record_detail"]["atServer"]
    searchConditionSelectorView:{gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections}|null
    searchResultView:{required:APIFunctions["record_search"]["atServer"],title?:string}
    gameSystemSelector:null
    gameModeSeletor:IGameSystemInfoWithoutCollections,
    mainMenu:null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections}
}
export const stateView = ["none","errorView","detailView","searchConditionSelectorView","searchResultView","gameSystemSelector","mainMenu"];
