import { icooonResolvable } from "../foundation/icooonResolvable";
import { IRecord } from "../record/IRecord";
import { IAbilityItem } from "./IAbilityItem";
import { IGameDifficultyItem } from "./IGameDifficultyItem";
import { ILabelledDocument } from "./ILabelledDocument";
import { IStoredOfferedRecord } from "./IStoredOfferedRecord";
import { ITargetItem } from "./ITargetItem";

/**
 * カービィの作品にそれぞれひとつずつ対応するID解決テーブル群
 * #TODO ここにIAbilityAttributeItemWithoutCollections
 */
export type ScoreType = "score"|"time";
export type IGameModeItem = IGameModeItemWithoutCollections & CollectionsInIGameModeItem
export interface IGameModeItemWithoutCollections extends ILabelledDocument,icooonResolvable{
    recordsNumber:number;
    dateOfLatestPost:number;
    maxNumberOfPlayer:number;
    scoreType:ScoreType;
    gameSystemID:string;
    UnverifiedRecordNumber?:number;
    DiscordRoleID?:string;
    runnerIDList:string[];
}
export interface CollectionsInIGameModeItem{
    targets: ITargetItem[];
    difficulties: IGameDifficultyItem[];
    abilities: IAbilityItem[];
    records:IRecord[];
    offers:IStoredOfferedRecord[];
}

