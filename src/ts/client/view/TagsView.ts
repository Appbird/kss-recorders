import { IRecordInShortResolved, IRecordResolved } from "../../type/record/IRecord";
import { element } from "../../utility/ViewUtility";
import {  IAppUsedToReadOptionsAndTransition } from "../interface/AppInterfaces";
import { PageStates } from "../interface/PageStates";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { IView } from "./IView";
type TagKind = "ability"|"target"|"gameSystem"|"hashTag"
export class TagsView implements IView{
    private element:HTMLElement = createElementWithIdAndClass({className:"c-tags"})
    private app:IAppUsedToReadOptionsAndTransition
    constructor(app:IAppUsedToReadOptionsAndTransition){
        this.app = app;
    }
    appendTag<T extends keyof PageStates>(tagName:string,kind:TagKind,transitionInfo:TransitionInfo<T>){
        this.element.appendChild(
        element`
            <div class = "c-tag --${kind}">
                <div class="c-iconWithDescription">
                <i class="${this.convert(kind)}"></i> ${tagName}
                </div>
            </div>`
        ).addEventListener("click",()=> {
            this.app.transition(transitionInfo.to,transitionInfo.requiredObject)
        })
        
        return this;
    }
    private convert(kind:TagKind){
        switch (kind){
            case "ability"  :   return `far fa-star`;
            case "target"   :   return `far fa-flag`;
            case "gameSystem":  return `fas fa-star`;
            case "hashTag":     return`fas fa-hashtag`;
        }
    }
    get htmlElement(){
        return this.element;
    }


    static generateTagViewsForRecord(app:IAppUsedToReadOptionsAndTransition,inserted:Element,record:IRecordInShortResolved | IRecordResolved,options:
        {gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean,hashTags?:boolean}
    ){
        const tagsViews = [new TagsView(app),new TagsView(app),new TagsView(app)];
        const gameEnv = record.regulation.gameSystemEnvironment;
        const order = (app.superiorScore === "Higher" ) ? "HigherFirst" : "LowerFirst"
        if (options.gameSystemTags) 
                tagsViews[0].appendTag(`${gameEnv.gameSystemName}/${gameEnv.gameModeName}/${gameEnv.gameDifficultyName}`,"gameSystem",{
                    to:"searchResultView",
                    requiredObject: {
                        title:`難易度${gameEnv.gameDifficultyName}の記録`,
                        required:{condition:[{
                            groupName:"", gameSystemEnv:{ gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID: gameEnv.gameDifficultyID },
                            orderOfRecordArray:order, limitOfRecordArray: 3, language: app.language
                        }]}
                    }
                })
        if (options.targetTags)
                tagsViews[0].appendTag(record.regulation.targetName,"target",{
                    to:"searchResultView",
                    requiredObject:{
                        title:`計測対象${record.regulation.targetName}の記録。`,
                        required:{condition:[{
                            groupName:"", gameSystemEnv:{ gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID }, targetIDs:[record.regulation.targetName] ,
                            orderOfRecordArray:order ,language:app.language
                        }]}
                    }
                });
        if (options.abilityTags)
                record.regulation.abilityNames.forEach( (ability,index) => tagsViews[1].appendTag((ability === undefined ? "Not Found" : ability),"ability",{
                    to:"searchResultView",
                    requiredObject:{
                        title:`能力${record.regulation.targetName}(ソロ)における、難易度${gameEnv.gameDifficultyName}の記録。`,
                        required:{condition:[{
                            groupName:"", gameSystemEnv:{ gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID:gameEnv.gameDifficultyID}, abilityIDs:[record.regulation.abilityIDs[index]],
                            orderOfRecordArray:order ,language:app.language
                        }]}
                    }
                })
            )
        if (options.hashTags && assureRecordIsFull(record))
            record.tagName.forEach( (tag,index) => tagsViews[1].appendTag((tag === undefined ? "Not Found" : tag),"hashTag",{
                to:"searchResultView",
                requiredObject:{
                    title:`タグ${tagsViews}における全体の記録。`,
                    required:{condition:[{
                        groupName:"", gameSystemEnv:{ gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID:"whole"}, tagIDs: [record.tagID[index]],
                        orderOfRecordArray:order ,language:app.language
                    }]}
                }
            })
        )
        

        if (options.gameSystemTags || options.targetTags)
                inserted.appendChild(tagsViews[0].htmlElement);
        if (options.abilityTags)
                inserted.appendChild(tagsViews[1].htmlElement);
        if (options.hashTags)
                inserted.appendChild(tagsViews[2].htmlElement);
    }
}
function assureRecordIsFull(record:IRecordInShortResolved | IRecordResolved):record is IRecordResolved{ 
    return "tagID" in record
}
interface TransitionInfo<T extends keyof PageStates>{
    to:T;
    requiredObject:PageStates[T]
}

