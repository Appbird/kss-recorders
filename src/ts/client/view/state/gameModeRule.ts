import { choiceString } from "../../../utility/aboutLang";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { PageTitleView } from "../parts/PageTitleView";
import { GameModeRuleView } from "../parts/GameModeRuleView";
import {PageStateBaseClass} from "./Base/PageStateClass"
import { RuleIndexPart } from "../parts/RuleIndexPart";
import { MenuView } from "../parts/MenuView";
import { RuleAttributeAndAppliedClassInfo } from "../../../type/api/gameRule/RuleAttributeAndAppliedClassInfo";
import { TitleCupsuled } from "../parts/TitleCupsuled";
import { formatDate } from "../../../utility/timeExpressionUtility";
export const contents = {
    title:{
        Japanese:   "ルール",
        English:    "Rule"
    },
    latestModifiedDate:{
        Japanese:   "このページのルールは<strong>${data}</strong>に制定されたものです。<br>この日時より以前に承認された記録はこのルールに沿わない可能性があります、ご了承ください。",
        English:    "These rules is enacted at <strong>${data}</strong>. <br>Please note that records verified before this time may not follow these rules."
    },
    ruleIndex:{
        Japanese:   "目次",
        English:    "Index"
    },
    detail:{
        Japanese:   "詳細",
        English:    "Detail"
    }
}
export class S_GameModeRule extends PageStateBaseClass<{gameSystemID:string,gameModeID:string},IAppUsedToReadAndChangeOnlyPageState>{
    async init(){
        const pagetitle = new PageTitleView(
            appendElement(this.articleDOM,"div"),
            choiceString(contents.title,this.app.state.language),"",
            "c-icooon u-background--contract"
        )
        this.generateLoadingSpinner()
        

        if (this.requiredObj.gameSystemID  === undefined) throw new Error("this.requiredObj.gameMode.rules === undefined")
        const response = (await this.app.accessToAPI("gameRule_get", { 
            gameSystemEnv:this.requiredObj,
            language: this.app.state.language
        }))
        const rules = response.result

        const attention = appendElement(this.articleDOM,"p","u-boldChara u-width90per u-smallerChara")
        attention.innerHTML = choiceString(contents.latestModifiedDate,this.app.state.language).replace(/\$\{data\}/g,formatDate(response.modifiedAt,"time",false))

        this.generateRuleIntroduction()

        const ruleIndexTitlePart = new TitleCupsuled(appendElement(this.articleDOM,"div","u-marginUpDown2em"))
        ruleIndexTitlePart.refresh(choiceString(contents.ruleIndex,this.app.state.language),undefined,{underline:true})
        
        if (rules === undefined) throw new Error("rules === undefined")
        const ruleIndexPart = new RuleIndexPart(appendElement(this.articleDOM,"div","u-marginUpDown2em"),this.app.state.language)

        const ruleDetailTitlePart = new TitleCupsuled(appendElement(this.articleDOM,"div","u-marginUpDown2em"))
        ruleDetailTitlePart.refresh(choiceString(contents.detail,this.app.state.language),undefined,{underline:true})
        rules.sort(sort)
        const ruleSegment = appendElement(this.articleDOM,"div","u-width90per")
        for (const ruleObj of rules) {
            const ruleDetailedSegment = appendElement(ruleSegment,"div")
            const view = new GameModeRuleView(ruleDetailedSegment,this.app.state.language)
            view.setHeader(ruleObj.rule)
            view.setRule(ruleObj)
            view.setNote(ruleObj.rule)
            const destinationYPosition = ruleDetailedSegment.getBoundingClientRect().y + window.scrollY
            ruleIndexPart.appendNewRule(ruleObj,() => this.app.scrollToThePagePosition(destinationYPosition))
        }
        ruleIndexPart.refrectView()
        this.deleteLoadingSpinner()
    }
    private generateRuleIntroduction(){
        const mainMenu = new MenuView(appendElement(appendElement(this.articleDOM,"div","u-width90per u-marginUpDown2em"),"div"),this.app.state.language,null)
        const isLogIn = this.app.loginAdministratorReadOnly.isUserLogin
        const isSetTargetGameMode = this.app.state.gameSystemEnvDisplayed.gameMode !== null
        mainMenu.generateMenuItem({
            title:{
                Japanese:"記録の申請",
                English:"Submit a Record",
                icon:"cloud"
            },
            description:{
                Japanese:(() => {
                    if (!isLogIn) return "<strong>申請にはログインが必要です。</strong>"
                    if (!isSetTargetGameMode) return "<strong>閲覧するゲームタイトル/モードを設定してください。</strong>"
                    return "自分の取った記録を、このページに掲示するために申請することができます。"
                })(),
                English:(() => {
                    if (!isLogIn) return "<strong>You need to log in first to see here.</strong>"
                    if (!isSetTargetGameMode) return "<strong>You need to set your Target Gamemode first to see here.</strong>"
                    return "You can submit your record to KSSRs here."
                })()
            },
            isDisabled:!isSetTargetGameMode || !isLogIn,
            biggerTitle:false,
            to:(this.app.loginAdministratorReadOnly.isUserLogin) ? () => this.app.transition("offerForm",null):undefined
        })
    }
}



function sort(a:RuleAttributeAndAppliedClassInfo,b:RuleAttributeAndAppliedClassInfo){
    if (a.rule.title > b.rule.title) return 1
    if (a.rule.title < b.rule.title) return -1
    return 1
}