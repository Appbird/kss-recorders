import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { ITargetItem } from "../../../../../type/list/ITargetItem";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { SelectChoicesCapsuled } from "../../SelectChoicesCapsuled";
import { UListCupsuled } from "../../UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import firebase from "firebase/app";

export class EditorIDPart implements EditorPart<string[]> {
    private container: HTMLElement;
    private selectInput: SelectChoicesCapsuled<ITargetItem>;
    private htmlCon: HTMLConverter;
    private static _requiredTypeInString = "string[]";
    private _requiredField:boolean;
    private ulist:UListCupsuled;
    private unsubscribe:(()=>void)|null = null;
    get requiredTypeInString(){
        return EditorIDPart._requiredTypeInString
    }
    constructor({container,language,title,description,requiredField,icooon,options,observed}:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description:MultiLanguageString[],
        requiredField:boolean,
        icooon?:string,
        options:ITargetItem[],
        observed?:firebase.firestore.CollectionReference
    }
    ) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h1 class="u-noUnderline">${generateIcooonHTML({icooonName:icooon})}${title}</h1>
        `);
        
        this.selectInput = new SelectChoicesCapsuled(this.container.appendChild(document.createElement("select")), options, { language: language,needMultipleSelect:true });
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        if (observed === undefined) return;

        this.unsubscribe = observed.onSnapshot(querySnapshots => {
            const selected = this.value;
            this.selectInput.clearStore();
            this.selectInput.setChoices(querySnapshots.docs.map(doc => doc.data() as ITargetItem))
            this.refresh(selected);
        })
    }
    addChangeEventListener(callback: (changed: string[]) => void) {
        this.selectInput.addEventListener("change", () => callback(this.value));
    }
    get value(): string[] {
        return this.selectInput.getValueAsArray();
    }
    disabled(state:boolean){
        if (state) this.selectInput.disable()
            else this.selectInput.enable()
    }
    refresh(value: string[]) {
        this.selectInput.setSelected(value);
    }
    refreshOption(options:ITargetItem[]){
        this.selectInput.clearStore();
        this.selectInput.setChoices(options);
    }
    isFill(): boolean {
        return this.selectInput.getValueAsArray().length === 0;
    }
    get requiredField(){
        return this._requiredField;
    }
    destroy(){
        if (this.unsubscribe !== null)this.unsubscribe();
        this.selectInput.destroy();
        this.ulist.destroy();
    }

}
