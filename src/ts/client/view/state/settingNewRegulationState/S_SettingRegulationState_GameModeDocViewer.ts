import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../PageStateClass";
import { EditorFormManager, InputFormObject } from "../../parts/SetNewRegulation/EditorFormManager";
import { appendElement } from "../../../utility/aboutElement";
import { IGameModeItemWithoutCollections } from "../../../../type/list/IGameModeItem";
import { EditorScoreTypePart } from "../../parts/SetNewRegulation/Editor/EditorScoreTypePart";
import { EditorPositiveIntegerPart } from "../../parts/SetNewRegulation/Editor/EditorNumberTypePart";
import { DocViewerRequired } from "./Types";
import { goBackFromDocToCollection, goDeeperFromDocToCollection, titleContext,generateBaseEditors,generateDescriptionEditors, createEditorSegmentBaseElement } from "./utility";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { choiceString } from "../../../../utility/aboutLang";
const context = {
    ...titleContext,
    List:{
        backSelectable:{
            title:{
                Japanese:"ゲームモードに戻る",
                English:"return to GameMode"
            },
            explain:{
                Japanese:"上の階層に戻ります。",
                //#CTODO 英訳
                English:"return to shallower directory."
            },
        },
        targetSelectable:{
            title:{
                Japanese:"計測対象",
                English:"Targets(Segments)"
            },
            explain:{
                Japanese:"このゲームモードの、計測対象となるセグメント(ボスやステージなど)を羅列しているリストです。",
                English:"The list included all of segments (such as bosses and stages) in this gamemode"
            },
        },
        abilitySelectable:{
            title:{
                Japanese:"能力",
                English:"Abilities"
            },
            explain:{
                Japanese:"このゲームモードに登場するコピー能力を羅列しているリストです。",
                English:"The list included all of abilities in this gamemode"
            },
        },
        difficultySelectable:{
            title:{
                Japanese:"難易度",
                English:"Difficulties"
            },
            explain:{
                Japanese:"このゲームモードに登場する難易度を羅列しているリストです。",
                English:"The list included all of difficulties in this gamemode"
            },
        }
    },
    Input:{
        Japanese:{
            title:{
                Japanese:"日本語名",
                English:"Japanese Name"
            },
            description:[{
                Japanese:"このゲームモードの日本語名を入力してください。",
                English:"Enter this gamemode's name in Japanese."
            }]
        },
        English:{
            title:{
                Japanese:"英語名",
                English:"English Name"
            },
            description:[{
                Japanese:"このゲームモードの英語名を入力して下さい。",
                English:"Enter this gamemode's name in English."
            }]
        },
        JapaneseDescription:{
            title:{
                Japanese:"日本語での説明",
                English:"Japanese Description"
            },
            description:[{
                Japanese:" このゲームモードについての説明を日本語で入力してください。",
                English:"Enter this gamemode's short description in Japanese."
            }]
        },
        EnglishDescription:{
            title:{
                Japanese:"英語での説明",
                English:"English Description"
            },
            description:[{
                Japanese:"このゲームモードについての説明を英語で入力して下さい。",
                English:"Enter this gamemode's short description in English."
            }]
        }
        ,
        scoreType:{
            title:{
                Japanese:"記録の種類",
                English:"Type of records in this gamemode"
            },
            description:[{
                Japanese:"このゲームモードにおける評価基準を選択してください。",
                //#CTODO ここの英訳
                English:"Select the measurement on this gamemode."
            }]
        },
        maxNumberOfPlayer:{
            title:{
                Japanese:"このモードにおける最大プレイ人数",
                English:"Max Number of Players in this gamemode"
            },
            description:[{
                Japanese:"このゲームモードでは何人まで一度に遊べるかを入力してください。",
                //#CTODO ここの英訳
                English:"Enter the number of players which this gamemode can hold."
            }]
        }
        
    }
}
type HandledType = IGameModeItemWithoutCollections;
export class S_SettingRegulationState_GameModeDocViewer
    extends PageStateBaseClass<DocViewerRequired, IAppUsedToChangeState> {
    private editorForm:EditorFormManager<HandledType>|null = null;
    init() {
        const unset = (this.requiredObj.id===undefined)
        const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: (this.requiredObj.id !== undefined) ? context.title:context.titleWithoutID,
                subTitle:  (this.requiredObj.id !== undefined) ? context.titleDescription:context.titleWithoutIDDescription
            },[
                {id:"back",icooon:"folder",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:false, onClickCallBack: () => goBackFromDocToCollection(this.app,this.requiredObj)},
                {id:"abilities",icooon:"star",title:context.List.abilitySelectable.title,description:context.List.abilitySelectable.explain,unused:unset, onClickCallBack: () => goDeeperFromDocToCollection(this.app,this.requiredObj,"abilities")},
                {id:"targets",icooon:"flag",title:context.List.targetSelectable.title,description:context.List.targetSelectable.explain,unused:unset, onClickCallBack: () => goDeeperFromDocToCollection(this.app,this.requiredObj,"targets")},
                {id:"difficulties",icooon:"difficulty",title:context.List.difficultySelectable.title,description:context.List.difficultySelectable.explain,unused:unset, onClickCallBack: () => goDeeperFromDocToCollection(this.app,this.requiredObj,"difficulties")},
            ])
        const lang = this.app.state.language;
        const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
        const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");
        const inputForms:InputFormObject<HandledType>= {
            ...generateBaseEditors(editorSegment,lang,context),
            
            scoreType:          new EditorScoreTypePart({
                container:createEditorSegmentBaseElement(editorSegment),
                                            language:lang,
                                            title:context.Input.scoreType.title,
                                            description:context.Input.scoreType.description,
                                            requiredField:true,
                                            indentifiedName:"scoreTypeSelector",
                                            icooon:"ds"
                                        }),
            maxNumberOfPlayer:  new EditorPositiveIntegerPart({
                container:createEditorSegmentBaseElement(editorSegment),
                                            language:lang,
                                            title:context.Input.maxNumberOfPlayer.title,
                                            description:context.Input.maxNumberOfPlayer.description,
                                            requiredField:true,
                                            icooon:"person"
                                        }),

            ...generateDescriptionEditors(editorSegment,lang,context)
        };
        const gameSystemID = this.requiredObj.collection.parent?.id
        if (gameSystemID === undefined) throw new Error("対応するゲームシステムIDが存在しません。")
        this.editorForm = new EditorFormManager(
            editorHeader,lang,this.requiredObj.collection,this.requiredObj.pathStack.join(" > "),inputForms,
            {
                id:"",
                Japanese:"",English:"",
                JDescription:"",EDescription:"",
                recordsNumber:0,runnersNumber:0,
                dateOfLatestPost:Date.now(),
                maxNumberOfPlayer:Date.now(),
                scoreType:"time",
                gameSystemID:gameSystemID
            },{
                ErrorCatcher:(error) => this.app.errorCatcher(error),
                whenAppendNewItem: (id,data) => {
                    for (const id of ["abilities","targets","difficulties"]) headerMaker.get(id).classList.remove("u-unused")
                    headerMaker.changeTitle({mainTitle:context.title,subTitle:context.titleDescription})
                    this.requiredObj.id = id;
                    
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

