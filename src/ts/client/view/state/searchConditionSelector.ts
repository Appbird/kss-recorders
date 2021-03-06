import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { SearchConditionSelectorView } from "../parts/searchConditionSelector";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SearchConditionSelector
    extends PageStateBaseClass<{gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections}|null,IAppUsedToReadAndChangePage>{
    async init(){
        this.generateLoadingSpinner("feather")
        if (this.requiredObj !== null) this.app.changeTargetGameMode(this.requiredObj)
        const difficulties = (await this.app.accessToAPI("list_difficulties",{
            gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
        })).result
        const abilities = (await this.app.accessToAPI("list_abilities",{
            gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
        })).result
        
        new SearchConditionSelectorView(this.articleDOM.appendChild(document.createElement("div")),this.app,difficulties,abilities)
        this.deleteLoadingSpinner();
    }
}


    