import { expected_IRegulation, IRegulation, IRegulationResolved, IRegulationWritedInDataBase } from "../foundation/IRegulation";
import { LanguageInApplication } from "../LanguageInApplication";

//#NOTE ここでの"Resolved"は、「IDを対応する文字列に置き換えた(ID解決済)状態である」ことを表す。Resolvedのオブジェクトでは、対応するResolvedでないオブジェクトのうち「Dを表さないパラメタ」を削除している。
//#NOTE また、"InShort"(日本語訳として「要約すると」)は、本来の記録よりも、「簡単に表示するにあたって必要ないデータを削った状態である」ことを表す。
export interface IRecordInShort {
    score: number;
    regulation: IRegulation;
    runnerID:string;
    id:string;
    isVerified:boolean;
}
export interface IRecordInShortResolved extends IRecordInShort {
    regulation: IRegulationResolved;
    runnerName:string;
}

export interface IRecord{
    id: string;
    //[x] ここの命名をtimeInMiliSecondではなくscoreにしたい…。
    score: number;
    //[x] timestampを追加する
    timestamp_post: number;
    regulation: IRegulation;
    runnerID: string;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    moderatorIDs: {id:string,date:number}[]; 
    tagID: string[];
    link: string[];
    note: string;
}
export interface IRecordWritedInDatabase{
    id: string;
    //[x] ここの命名をtimeInMiliSecondではなくscoreにしたい…。
    score: number;
    //[x] timestampを追加する
    timestamp_post: number;
    regulation: IRegulationWritedInDataBase;
    runnerID: string;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    moderatorIDs: {id:string,date:number}[]; 
    tagID: string[];
    link: string[];
    note: string;
}
export interface IRecordWithoutID {
    //[x] ここの命名をtimeInMiliSecondではなくscoreにしたい…。
    score: number;
    //[x] timestampを追加する
    timestamp_post: number;
    regulation: IRegulation;
    runnerID: string;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    tagID: string[];
    link: string[];
    note: string;
    moderatorIDs?: {id:string,date:number}[]; 
}
export const expected_IRecord = {
    id: "string",
    score: "number",
    timestamp: "number",
    regulation: expected_IRegulation,
    runnerID: "string",
    tagID: "string[]",
    link: "string[]",
    note: "string"
}
export interface IRecordResolved extends IRecord{
    runnerName: string;
    tagName: string[];
    regulation: IRegulationResolved;
    moderatorIDsResolved: string[];
}


export interface ModifiedHistoryStack{
    modifierID:string,timestamp:number,
    before:{
        score:number;
        timestamp_post:number;
        regulation:IRegulationWritedInDataBase;
        runnerID:string;
        tagName: string[];
        languageOfTagName:LanguageInApplication;
        tagID:string[];
        link:string[];
        note:string;
    }
}