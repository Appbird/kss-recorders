import { S_NowLoading } from "../nowLoading";
import { S_ErrorState} from "../ErrorState"
import { PageStatesConstructorObj} from "../../../interface/PageStatesStructure";
import { S_DetailViewer } from "../DetailViewer";
import { S_SearchConditionSelector } from "../searchConditionSelector";
import { S_SearchResult } from "../searchResult";
import { S_GameSystemSelector } from "../gameSystemSelector";
import { S_GameModeSelector } from "../GameModeSelector";
import { S_MainMenu } from "../mainMenu";
import { IAppUsedToRead } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";
import { S_OfferForm } from "../offerForm";
import { S_SpinnerExhibition } from "../SpinnerExhibition";
import { S_SettingNewRegulationState_CollectionViewer } from "../settingNewRegulationState/S_SettingRegulationState_CollectionViewer";
import { S_SettingRegulationState_GameSystemDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_GameSystemDocViewer";
import { S_SettingRegulationState_GameModeDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_GameModeDocViewer";
import { S_SettingRegulationState_AbilityDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_AbilityDocViewer";
import { S_SettingRegulationState_TargetDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_TargetDocViewer";
import { S_SettingRegulationState_DifficultyDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_DifficultyDocViewer";
import { S_GamemodeListOfPlayersPlayed } from "../gamemodeListOfPlayersPlayed";
import { S_UserPageInSpecific } from "../UserPageInSpecific";
import { S_UserPageInWhole } from "../UserPageInWhole";
import { S_SettingUserInfo } from "../settingUserInfo";
import { S_NotificationList } from "../notificationList";
import { S_ModifyRecordForm } from "../modifyRecordForm";
import { S_Credits } from "../credits/credits";
import { S_SettingRegulationState_CollectionAppender } from "../settingNewRegulationState/S_InsertingNewCollection";
import { S_UnverifiedRecords } from "../UnverifiedRecords";
import { S_TermOfUse } from "../termOfUse";
import { S_introduction } from "../introduction";
import { S_SetLanguage } from "../setLanguage";
import { S_GameModeRule } from "../gameModeRule";
import { S_SettingRegulationState_AbilityAttributeDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_AbilityAttributeDocViewer";
import { S_SettingRegulationState_TagsDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_TagsDocViewer";
import { S_SettingRegulationState_GameRuleAttributeDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_GameRuleAttributeDocViewer";
import { S_SettingRegulationState_GameRuleClassDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_GameRuleClassDocViewer";
import { S_SettingRegulationState_AbilityAttributeFlagDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_AbilityAttributeFlagDocViewer";
import { S_SettingRegulationState_AppliedGameRuleDocViewer } from "../settingNewRegulationState/S_SettingRegulationState_AppliedGameRuleDocViewer";
import { S_SettingRegulationState_Top } from "../settingNewRegulationState/S_SettingNewRegulationState_Top";

export type RequiredObjectType<StateClass> = StateClass extends PageStateBaseClass<infer U,IAppUsedToRead>? U : never;
export type UsedIAppLimited<IAppLimited> = IAppLimited extends PageStateBaseClass<any,infer U>? U:never;
export type PageStates = PageStatesWithRequiredObject & PageStateWithoutRequiredObject;
export interface PageStatesWithRequiredObject{
    //#NOTE それぞれのステートに対応するステートクラスをここに記述する。
    errorView:S_ErrorState,
    detailView:S_DetailViewer,
    searchResultView:S_SearchResult,
    gameModeSeletor:S_GameModeSelector,

    userPageInWhole:S_UserPageInWhole,
    userPageInSpecific:S_UserPageInSpecific,
    gamemodeListOfPlayersPlayed:S_GamemodeListOfPlayersPlayed,
    settingUserInfo:S_SettingUserInfo,
    notificationList:S_NotificationList,

    modifyRecordForm:S_ModifyRecordForm

    settingRegulation_GameSystemDocViewer:S_SettingRegulationState_GameSystemDocViewer,
    settingRegulation_GameModeDocViewer:S_SettingRegulationState_GameModeDocViewer,
    settingRegulation_AbilityDocViewer:S_SettingRegulationState_AbilityDocViewer,
    settingRegulation_TargetDocViewer:S_SettingRegulationState_TargetDocViewer,
    settingRegulation_DifficultyDocViewer:S_SettingRegulationState_DifficultyDocViewer,
    settingRegulation_CollectionAppender: S_SettingRegulationState_CollectionAppender,
    settingRegulation_AbilityAttributeDocViewer: S_SettingRegulationState_AbilityAttributeDocViewer,
    settingRegulation_AbilityAttributeFlagDocViewer: S_SettingRegulationState_AbilityAttributeFlagDocViewer,
    settingRegulation_TagsDocViewer: S_SettingRegulationState_TagsDocViewer,
    settingRegulation_RulesDocViewer: S_SettingRegulationState_GameRuleAttributeDocViewer,
    settingRegulation_RuleClassesDocViewer: S_SettingRegulationState_GameRuleClassDocViewer,
    settingRegulation_AppliedRulesDocViewer: S_SettingRegulationState_AppliedGameRuleDocViewer,
    settingRegulation_Top: S_SettingRegulationState_Top,

    unverifiedRecord:S_UnverifiedRecords,
    gameRuleView:S_GameModeRule
}
export interface PageStateWithoutRequiredObject{
    NowLoading:S_NowLoading,
    searchConditionSelectorView:S_SearchConditionSelector,
    gameSystemSelector:S_GameSystemSelector,
    mainMenu:S_MainMenu,
    offerForm:S_OfferForm,
    spinnerExhibition:S_SpinnerExhibition,
    settingNewRegulation_CollectionViewer:S_SettingNewRegulationState_CollectionViewer,
    credits:S_Credits,
    termOfUse:S_TermOfUse
    introduction:S_introduction,
    language:S_SetLanguage
}
export const pageStates:PageStatesConstructorObj= {
    NowLoading:S_NowLoading,
    searchConditionSelectorView:S_SearchConditionSelector,
    gameSystemSelector:S_GameSystemSelector,
    mainMenu:S_MainMenu,
    offerForm:S_OfferForm,
    spinnerExhibition:S_SpinnerExhibition,
    settingNewRegulation_CollectionViewer:S_SettingNewRegulationState_CollectionViewer,


    errorView:S_ErrorState,
    detailView:S_DetailViewer,
    searchResultView:S_SearchResult,
    gameModeSeletor:S_GameModeSelector,
    notificationList:S_NotificationList,

    userPageInWhole:S_UserPageInWhole,
    userPageInSpecific:S_UserPageInSpecific,
    gamemodeListOfPlayersPlayed:S_GamemodeListOfPlayersPlayed,
    settingUserInfo:S_SettingUserInfo,

    settingRegulation_GameSystemDocViewer:S_SettingRegulationState_GameSystemDocViewer,
    settingRegulation_GameModeDocViewer:S_SettingRegulationState_GameModeDocViewer,
    settingRegulation_AbilityDocViewer:S_SettingRegulationState_AbilityDocViewer,
    settingRegulation_TargetDocViewer:S_SettingRegulationState_TargetDocViewer,
    settingRegulation_DifficultyDocViewer:S_SettingRegulationState_DifficultyDocViewer,
    settingRegulation_CollectionAppender: S_SettingRegulationState_CollectionAppender,
    settingRegulation_AbilityAttributeDocViewer: S_SettingRegulationState_AbilityAttributeDocViewer,
    settingRegulation_AbilityAttributeFlagDocViewer: S_SettingRegulationState_AbilityAttributeFlagDocViewer,
    settingRegulation_TagsDocViewer: S_SettingRegulationState_TagsDocViewer,
    settingRegulation_RulesDocViewer: S_SettingRegulationState_GameRuleAttributeDocViewer,
    settingRegulation_RuleClassesDocViewer: S_SettingRegulationState_GameRuleClassDocViewer,
    settingRegulation_AppliedRulesDocViewer: S_SettingRegulationState_AppliedGameRuleDocViewer,
    settingRegulation_Top: S_SettingRegulationState_Top,

    modifyRecordForm:S_ModifyRecordForm,
    credits:S_Credits,
    unverifiedRecord:S_UnverifiedRecords,
    termOfUse:S_TermOfUse,
    introduction:S_introduction,
    language:S_SetLanguage,
    gameRuleView:S_GameModeRule
}
