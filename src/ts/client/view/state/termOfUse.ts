import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { choiceString } from "../../../utility/aboutLang";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { IAppUsedToRead } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { PageTitleView } from "../parts/PageTitleView";
import { PageStateBaseClass } from "./PageStateClass";
import context from "./termOfUse.json" 

const contents = context.termOfUse as ITermOfUse
export class S_TermOfUse extends PageStateBaseClass<null,IAppUsedToRead>{
    async init(){
        const htmlConverter = new HTMLConverter(this.app.state.language)
        const header = new PageTitleView(this.articleDOM,
                choiceString(contents.title,this.app.state.language),
                "",
                "fas fa-file-signature"
            )
        
        const abstructContainers = 
            this.articleDOM.appendChild(htmlConverter.elementWithoutEscaping`<div class="u-background--gray"></div>`)
                .appendChild(htmlConverter.elementWithoutEscaping`<div class="u-marginUpDown05emToChildren u-padding3em u-width90per"></div>`) as HTMLElement
        abstructContainers.appendChild(htmlConverter.elementWithoutEscaping`<div class="u-space3em"></div>`)
        abstructContainers.appendChild(htmlConverter.elementWithoutEscaping`<h2>${contents.abstruct.header}</h2>`)
        const descriptionContainer = appendElement(abstructContainers,"ul")
        describe(htmlConverter, descriptionContainer,contents.abstruct.description,1)
        abstructContainers.appendChild(htmlConverter.elementWithoutEscaping`<div class="u-space3em"></div>`)

        const termOfUseContainers = this.articleDOM.appendChild(htmlConverter.elementWithoutEscaping`
        <div class="u-marginUpDown05emToChildren u-width90per"></div>`) as HTMLElement
        
        for (const content of context.termOfUse.contents){
            termOfUseContainers.appendChild(htmlConverter.elementWithoutEscaping`<h1>${content.header}</h1>`)
            const descriptionContainer = appendElement(termOfUseContainers,"ul")
            describe(htmlConverter, descriptionContainer,content.description,1)
            termOfUseContainers.appendChild(htmlConverter.elementWithoutEscaping`<div class="u-space3em"></div>`)
        }
        
    }
}

function describe(htmlConverter:HTMLConverter,container:HTMLElement,descriptions:Description[],indentLevel:number){
    for (const description of descriptions){
        container.appendChild(htmlConverter.elementWithoutEscaping`<li class="u-indent--level${indentLevel.toString()}">${description}</li>`)
        if (description.items !== undefined) describe(htmlConverter, container,description.items,indentLevel+1)
    }
}
interface ITermOfUse{
        title:MultiLanguageString;
        abstruct:{
            header:MultiLanguageString,
            description:Description[]
        };
        contents:{
            header:MultiLanguageString,
            description:Description[]
        }[]
}
type Description = (MultiLanguageString&{items?:Description[]})