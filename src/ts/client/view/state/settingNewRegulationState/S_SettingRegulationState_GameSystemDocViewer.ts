import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../PageStateClass";
import { EditorFormManager, InputFormObject } from "../../parts/SetNewRegulation/EditorFormManager";
import { IGameSystemInfoWithoutCollections } from "../../../../type/list/IGameSystemInfo";
import { appendElement } from "../../../utility/aboutElement";
import { EditorDatePart } from "../../parts/SetNewRegulation/Editor/EditorDatePart";
import { DocViewerRequired } from "./Types";
import { createEditorSegmentBaseElement, generateBaseEditors, generateDescriptionEditors, goBackFromDocToCollection, goDeeperFromDocToCollection, titleContext } from "./utility";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { choiceString } from "../../../../utility/aboutLang";
const context = {
    ...titleContext,
    List:{
        backSelectable:{
            title:{
                Japanese:"ゲームタイトルのリストに戻る",
                English:"back to the list of titles."
            },
            explain:{
                Japanese:"ここを押すとより浅い階層に戻ることが出来ます。",
                //#CTODO 英訳
                English:"Press this button to go back to shallower directory."
            },
        },
        modeSelectable:{
            
            title:{
                Japanese:"ゲームモード",
                English:"GameMode"
            },
            explain:{
                Japanese:"この作品に登場するゲームモードを羅列しているリストです。",
                English:"The list included all of the gamemodes in this title"
            }
        },
    },
    Input:{
        Japanese:{
            title:{
                Japanese:"日本語名",
                English:"Japanese Name"
            },
            description:[{
                Japanese:"この作品の日本語名を入力してください。",
                English:"Enter this title's name in Japanese."
            }]
        },
        English:{
            title:{
                Japanese:"英語名",
                English:"English Name"
            },
            description:[{
                Japanese:"この作品の英語名を入力して下さい。",
                English:"Enter this title's name in English."
            }]
        },
        JapaneseDescription:{
            title:{
                Japanese:"日本語での説明",
                English:"Japanese Description"
            },
            description:[{
                Japanese:" この作品についての説明を日本語で入力してください。",
                English:"Enter this title's short description in Japanese."
            }]
        },
        EnglishDescription:{
            title:{
                Japanese:"英語での説明",
                English:"English Description"
            },
            description:[{
                Japanese:"この作品についての説明を英語で入力して下さい。",
                English:"Enter this title's short description in English."
            }]
        }
        ,
        releasedData:{
            title:{
                Japanese:"発売日",
                English:"Released Date"
            },
            description:[{
                Japanese:"この作品のリリース日を入力してください。",
                English:"Press the button below to set the released date of this title <strong>In Japanese</strong>."
            }]
        }
    }
}
type HandledType = IGameSystemInfoWithoutCollections;
export class S_SettingRegulationState_GameSystemDocViewer
    extends PageStateBaseClass<DocViewerRequired, IAppUsedToChangeState> {
    private editorForm:EditorFormManager<HandledType>|null = null;
    init() {
        const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: (this.requiredObj.id !== undefined) ? context.title:context.titleWithoutID,
                subTitle:  (this.requiredObj.id !== undefined) ? context.titleDescription:context.titleWithoutIDDescription
            },[
            {
                id:"back",icooon:"folder",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:false, onClickCallBack: () => goBackFromDocToCollection(this.app,this.requiredObj)
            },
            {
                id:"modes",icooon:"ns",title:context.List.modeSelectable.title,description:context.List.modeSelectable.explain,unused:(this.requiredObj.id===undefined), onClickCallBack: () => goDeeperFromDocToCollection(this.app,this.requiredObj,"modes")
            }])
        const lang = this.app.state.language;
        const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
        const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");
        const inputForms:InputFormObject<HandledType>= {

            ...generateBaseEditors(editorSegment,lang,context),
                                        
            releasedDate:       new EditorDatePart({
                container:createEditorSegmentBaseElement(editorSegment),
                                            language:lang,
                                            title:context.Input.releasedData.title,
                                            description:context.Input.releasedData.description,
                                            icooon:"ns",
                                            requiredField:true
                                        }),
                                        
            ...generateDescriptionEditors(editorSegment,lang,context)
        };
        this.editorForm = new EditorFormManager(
            editorHeader,lang,this.requiredObj.collection,this.requiredObj.pathStack.join(" > "),inputForms,
            {
                id:"",
                Japanese:"",English:"",
                JDescription:"",EDescription:"",
                recordsNumber:0,runnersNumber:0,
                dateOfLatestPost:Date.now(),
                releasedDate:Date.now(),
            },{
                ErrorCatcher:(error) => this.app.errorCatcher(error),
                whenAppendNewItem: (id,data) => {
                    headerMaker.get("modes").classList.remove("u-unused")
                    headerMaker.changeTitle({mainTitle:context.title,subTitle:context.titleDescription})
                    this.requiredObj.id = id
                    
                    this.requiredObj.pathStack.pop();
                    this.requiredObj.pathStack.push(choiceString(data,this.app.state.language));
                    this.app.notie.successAlert({
                        Japanese:`${data.Japanese}の登録に成功しました！`,
                        English:`Registering ${data.English} is completed successfully!`,
                    });
                },
                whenReset: () => {
                    this.app.notie.errorAlert({
                        Japanese:`操作していたデータはサーバーサイドの操作により削除されました。`,
                        English:`The data you were editting was deleted by operation of the server.`,
                    });
                },
                id:this.requiredObj.id   
            })
        
    }
    destroy(){
        if (this.editorForm !== null) this.editorForm.destroy();
    }
}

