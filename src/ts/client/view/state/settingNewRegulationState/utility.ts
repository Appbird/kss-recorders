import { MultiLanguageString } from "../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { element } from "../../../../utility/ViewUtility";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../../interface/AppInterfaces";
import { appendElement } from "../../../utility/aboutElement";
import { EditorTextPart } from "../../parts/SetNewRegulation/Editor/EditorTextPart";
import { DocViewerRequired } from "./Types";

type CollectionName = "modes"|"abilities"|"targets"|"difficulties"
export function goDeeperFromDocToCollection(app:IAppUsedToReadAndChangeOnlyPageState,requiredObj:DocViewerRequired,destination:CollectionName){
    if (requiredObj.id === undefined) return;
    
    console.log(`[KSSRs] go to ${requiredObj.collection.path}/${(requiredObj.id) ? requiredObj.id : "(new)"}/${destination} ...`)
    requiredObj.pathStack.push(destination);
    app.transition("settingNewRegulation_CollectionViewer",{
        collection:requiredObj.collection.doc(requiredObj.id).collection(destination),
        pathStack:requiredObj.pathStack
    },{ifAppendHistory:false})
}
export function goBackFromDocToCollection(app:IAppUsedToReadAndChangeOnlyPageState,requiredObj:DocViewerRequired){
    requiredObj.pathStack.pop()
    console.log(`[KSSRs] go to ${requiredObj.collection.path} /  ...`)
    app.transition("settingNewRegulation_CollectionViewer",{
        collection:requiredObj.collection,
        pathStack:requiredObj.pathStack
    },{ifAppendHistory:false})
}

export function createEditorSegmentBaseElement(container:HTMLElement,):HTMLElement{
    const result = appendElement(container,"div")
    container.appendChild(element`<hr noshade class="u-thin">`);
    return result;
}

export function generateBaseEditors(container:HTMLElement,lang:LanguageInApplication,context:{
        Input:{
            Japanese:{title:MultiLanguageString,description:MultiLanguageString[]},
            English:{title:MultiLanguageString,description:MultiLanguageString[]},
        },
}){
    return {
        Japanese:           new EditorTextPart({
            container:createEditorSegmentBaseElement(appendElement(container,"div")),
                                    language:lang,
                                    title:context.Input.Japanese.title,
                                    description:context.Input.Japanese.description,
                                    icooon:"tag",
                                    requiredField:true
                                }),
        English:            new EditorTextPart({
            container:createEditorSegmentBaseElement(appendElement(container,"div")),
                                        language:lang,
                                        title:context.Input.English.title,
                                        description:context.Input.English.description,
                                        requiredField:true,
                                        icooon:"tag",
                                    }),
    }
}
export function generateDescriptionEditors(container:HTMLElement,lang:LanguageInApplication,context:{
    Input:{
        JapaneseDescription:{title:MultiLanguageString,description:MultiLanguageString[]},
        EnglishDescription:{title:MultiLanguageString,description:MultiLanguageString[]},
    },
}){
return {
    JDescription:       new EditorTextPart({
        container:createEditorSegmentBaseElement(appendElement(container,"div")),
                                    language:lang,
                                    title:context.Input.JapaneseDescription.title,
                                    description:context.Input.JapaneseDescription.description,
                                    icooon:"feather",
                                    requiredField:false
                                }),
    EDescription:       new EditorTextPart({
        container:createEditorSegmentBaseElement(appendElement(container,"div")),
                                language:lang,
                                title:context.Input.EnglishDescription.title,
                                description:context.Input.EnglishDescription.description,
                                icooon:"feather",
                                requiredField:false
                                }),
}
}
export const titleContext = {
    titleWithoutID:{
        Japanese:"?????????????????????",
        English:"Registering new item",
    },
    
    titleWithoutIDDescription:{
        Japanese:"?????????????????????????????????????????????????????????????????????",
        English:"When you fill out all of the required fields, the item will be sent to the server and inserted."
    },
    title:{
        Japanese:"??????????????????",
        English:"Select where you want to edit."
    },
    titleDescription:{
        Japanese:"",
        English:""
    },
}