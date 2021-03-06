import { PageStates, RequiredObjectType } from "../view/state/PageStates";
import {  IAppUsedToReadAndChangeOnlyPageState } from "../interface/AppInterfaces";
import { TargetGameMode } from "./StateAdminister";
export class HistoryAdministrator{
    private app:IAppUsedToReadAndChangeOnlyPageState;
    private transitionPile:TransitionItem<keyof PageStates>[] = [];
    constructor(app:IAppUsedToReadAndChangeOnlyPageState){
        this.app = app;
        window.addEventListener('popstate', (e) => {
            this.back();
        });
    }
    async appendHistory(){
        this.transitionPile.push({
            pageState:this.app.state.state,
            requiredObject:this.app.state.requiredObj
        })
    }

    registerCurrentPage(){
        localStorage.setItem("KSSRs::HistoryAdministrator::PreviousPage",JSON.stringify({
            pageState:this.app.state.state,
            requiredObject:this.app.state.requiredObj
        }))
        
        history.pushState(null,`Kirby-Speed/ScoreRecorders:${this.app.state.state}`,`/app?state=${this.app.state.state}`)
        console.info(`[KSSRs::HistoryAdministrator::PreviousPage] register current page: ${this.app.state.state} page.`)
    }
    registerCurrentTargetGamemode(){
        localStorage.setItem("KSSRs::HistoryAdministrator::TargetMode",JSON.stringify(this.app.state.gameSystemEnvDisplayed))
        console.info(`[KSSRs::HistoryAdministrator::TargetMode] register current target gamemode: ${this.app.state.gameSystemEnvDisplayed.gameSystem?.English} / ${this.app.state.gameSystemEnvDisplayed.gameMode?.Japanese}`)
    }

    back(){
        const past = this.transitionPile.pop();
        if (past === undefined) return;
        this.app.transition(past.pageState,past.requiredObject,{ifAppendHistory:false})
    }
    getPreviousPageData():TransitionItem<keyof PageStates>|null{
        const str = localStorage.getItem("KSSRs::HistoryAdministrator::PreviousPage")
        if (str === null) return null;
        try {
            const result = JSON.parse(str)
            if (!(result.hasOwnProperty("pageState") && typeof result.pageState === "string" && result.hasOwnProperty("requiredObject"))) throw new Error()
            return result;
        } catch(err) {
            localStorage.removeItem("KSSRs::HistoryAdministrator::PreviousPage");
            console.info(`[KSSRs::HistoryAdministrator::PreviousPage] KSSRs found cache (about where you visit in KSSRs most recently) is collapsed, so removed it.`)
            return null;
        }
    }
    getPreviousTargetGamemode():TargetGameMode|null{
        const str = localStorage.getItem("KSSRs::HistoryAdministrator::TargetMode")
        if (str === null) return null;
        try {
            const result = JSON.parse(str)
            return result;
        } catch(err) {
            localStorage.removeItem("KSSRs::HistoryAdministrator::TargetMode");
            console.info(`[KSSRs::HistoryAdministrator::TargetMode] KSSRs found cache (about where you visit in KSSRs most recently) is collapsed, so removed it.`)
            return null;
        }
    }
    removePreviousPageData(){
        localStorage.removeItem("KSSRs::HistoryAdministrator::PreviousPage");
    }
    removeTargetGamemode(){
        localStorage.removeItem("KSSRs::HistoryAdministrator::TargetMode");
    }

}
export interface TransitionItem<T extends keyof PageStates>{
    pageState:T
    requiredObject:RequiredObjectType<PageStates[T]>
}