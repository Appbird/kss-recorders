import { IRecordResolved } from "../../../../type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../../utility/timeUtility";
import {  elementWithoutEscaping, HTMLConverter } from "../../../../utility/ViewUtility";
import { IView } from "../../IView";
import { TagsView } from "../TagsView";
import { convertNumberToRank } from "../../../../utility/rankUtility";
import { MovieWidgetCreator } from "../MovieWidgetCreator";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { TagsClickedCallbacks } from "../TagsClickedCallbacks";
import { findElementByClassNameWithErrorPossibility } from "../../../utility/aboutElement";
import context from "./language.json"
const marked = require("marked")

export class RecordDetailView implements IView{
    private container:HTMLElement
    /**
     * @param rankOfTheRecord 0を指定すると順位表記を消すことが出来る。
     */
    constructor(
        container:HTMLElement,
        recordDetail:IRecordResolved,
        { 
            rankOfTheRecord, clickedCallBacks = {},onClickRunnerName,language
        }:{
            rankOfTheRecord:number,
            language:LanguageInApplication
            clickedCallBacks:TagsClickedCallbacks,
            onClickRunnerName:()=>void,
        }
    ){
        this.container = container;
        const htmlC = new HTMLConverter(language);
        const recordDetailElement = this.container.appendChild(
            htmlC.elementWithoutEscaping`
                <div class="recordDetail">

                        <div class="c-title">
                            <div class="c-title__main">${context.header}</div>
                        </div>

                    <hr noshade class="u-bold">

                    <div class="u-width95per standardInfo">

                        <div class = "c-evidenceMovie evidenceMovie">
                        </div>
                        <div class="c-title">
                            <div class="c-title__sub u-underline"><i class="fas fa-link"></i> <a href="${recordDetail.link[0]}">${recordDetail.link[0]}</a> </div>
                        </div>
                        
                        <div class="c-title">
                            <div class="c-title__main u-biggerChara">${converseMiliSecondsIntoTime(recordDetail.score)}</div>
                            <div class="c-title__sub u-biggerChara onClickEvent_RunnerName">${(rankOfTheRecord === 0) ? "" : convertNumberToRank(rankOfTheRecord)}: <i class="fas fa-user"></i>${recordDetail.runnerName}</div>
                        </div>
                        <hr noshade class="u-thin">
                        <div class="tagsDetail"></div>

                    </div>


                    <div class="u-space3em"></div>


                    <div class="c-title">
                        <div class="c-title__main">${context.runnersNoteHeader}</div>
                    </div>

                    <hr noshade class="u-bold">

                    <div class="u-width95per">
                        <div class="c-runnerNote">
                            ${marked(recordDetail.note)}
                        </div>
                        <div class="u-space3em"></div>
                    </div>

                </div>
            `)
            
            //#TODO クリックすると走者ページに飛ぶようにしたい
            findElementByClassNameWithErrorPossibility(recordDetailElement,"onClickEvent_RunnerName").addEventListener("click",() => onClickRunnerName())
            const standardInfoDiv = findElementByClassNameWithErrorPossibility(recordDetailElement,"standardInfo")
            const evidenceMovieDiv = findElementByClassNameWithErrorPossibility(recordDetailElement,"evidenceMovie")
            new MovieWidgetCreator(evidenceMovieDiv,recordDetail.link[0]).setWidget()
            this.generateTagViewsForRecord(standardInfoDiv,recordDetail,clickedCallBacks)
    }

    destroy(){
        this.container.innerHTML = "";
        
    }

    private generateTagViewsForRecord(container:Element,record:IRecordResolved,
        clickedCallBacks:TagsClickedCallbacks = {}
    ){ 
        const tagsViews = [
            new TagsView(container.appendChild(document.createElement("div"))),
            new TagsView(container.appendChild(document.createElement("div"))),
            new TagsView(container.appendChild(document.createElement("div")))
        ];
        const rrg = record.regulation.gameSystemEnvironment;

        tagsViews[0].appendTag(`${rrg.gameSystemName}/${rrg.gameModeName}/${rrg.gameDifficultyName}`,"gameSystem",{callBackOnClick:clickedCallBacks.gameSystem})
        tagsViews[0].appendTag(record.regulation.targetName,"target",{callBackOnClick:clickedCallBacks.target})

        record.regulation.abilityNames.forEach( ele => 
            tagsViews[1].appendTag(ele,"ability",{callBackOnClick:clickedCallBacks.target})
        )
        record.tagName.forEach( ele => 
            tagsViews[2].appendTag(ele,"hashTag",{callBackOnClick:clickedCallBacks.gameSystem})
        )

    }
}

