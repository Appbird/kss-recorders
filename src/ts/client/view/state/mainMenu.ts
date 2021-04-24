import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_MainMenu
    extends PageStateBaseClass<null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections},IAppUsedToReadAndChangePage>{
        private htmlConverter:HTMLConverter;
        constructor(app:IAppUsedToReadAndChangePage,articleDOM:HTMLElement,required:null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections}) {
            super(app,articleDOM,required)
            this.htmlConverter = new HTMLConverter(this.app.state.language)
        }
        init(){
            //#TODO ここに機能へつながるリンクを列挙する。ヘッダをクリックするとこのページに遷移する。
            
            if (this.requiredObj === null) return;
            this.app.changeTargetGameMode(this.requiredObj);

            const main = this.articleDOM.appendChild(this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="c-title u-width95per">
                    <div class="c-title__main">Welcome to Kirby-Speed/Score-Recorders!</div>
                </div>
                <hr noshade class="u-thin">
                <div class="u-width95per">${{Japanese:"ここでは、「星のカービィ」シリーズにおけるゲームのスコア/タイムを記録したり、閲覧することができます。"}}</div>
                
                <div class="u-space2em"></div>
                <div class="u-width90per">
                  
                <div class="u-space3em"></div>
            </div>
            `)
            const mainMenu = main.appendChild(this.htmlConverter.elementWithoutEscaping`
                <div class="c-list">
                    <div class="c-title">
                        <div class="c-title__main">メインメニュー</div>
                        <div class="c-title__sub">Main Menu</div>
                    </div>
                    <hr noshade class="u-thin">
                </div>
            `)
            this.generateMainMenuInfo().map(info => mainMenu.appendChild(
                this.generateMainMenuItem(info)
            ));
            const detailMenu = main.appendChild(this.htmlConverter.elementWithoutEscaping`
                <div class="c-list">
                    <div class="c-title">
                        <div class="c-title__main">詳細設定 / その他</div>
                        <div class="c-title__sub">Detail Settings / etc.</div>
                    </div>
                    <hr noshade class="u-thin">
                </div>
            `)
            this.generateDetailMenuInfo().map(info => detailMenu.appendChild(
                this.generateDetailMenuItem(info)
            ));

        }
        generateMainMenuItem({title,remarks,description,to}:RequiredObjectToGenerateItem){
            
            const item = this.htmlConverter.elementWithoutEscaping`
            <div class="c-recordCard">
                    <div class = "c-title">
                        <div class = "c-title__main"><i class="c-icooon u-background--${title.icon}"></i>${title}</div>
                        ${ (remarks === undefined) ? ``:`<div class = "c-title__sub"><i class="c-icooon u-background--${remarks.icon}"></i> ${remarks}</div>`}
                    </div>
                    <hr noshade class="u-thin">
                    <div class = "u-width95per">${description}</div>
            </div>` as HTMLElement
            if (to === undefined) return item;
            item.addEventListener("click",()=>to());
            return item;
        }
        generateDetailMenuItem({title,description,to}:RequiredObjectToGenerateItem){
            
            const item = this.htmlConverter.elementWithoutEscaping`
            <div class="c-recordCard">
                    <div class = "c-title">
                        <div class = "c-title__main u-smallerChara"><i class="c-icooon u-background--${title.icon}"></i>${title}</div>
                    </div>
                    <hr noshade class="u-thin">
                    <div class = "u-width95per">${description}</div>
            </div>` as HTMLElement
            if (to === undefined) return item;
            item.addEventListener("click",()=>to());
            return item;
        }


        generateMainMenuInfo():RequiredObjectToGenerateItem[]{
           const userName = (this.app.loginAdministratorReadOnly.loginUserName === null) ? "":this.app.loginAdministratorReadOnly.loginUserName;
           const asg = this.app.state.gameSystemEnvDisplayed;
           const isSetTargetGameMode = asg.gameSystem!==null && asg.gameMode!==null
           const isLogIn = this.app.loginAdministratorReadOnly.isUserLogin;
           const targetGameMode = {
               ja:(isSetTargetGameMode) ? `${asg.gameSystem?.JName} / ${asg.gameMode?.JName}`:`未設定`,
               en:(isSetTargetGameMode) ? `${asg.gameSystem?.EName} / ${asg.gameMode?.EName}`:`未設定`
           }
           //#TODO まともに日本語訳
            return [{
                title:{
                    Japanese:(isLogIn) ?  "ログアウト":"サインイン / ログイン",
                    English:(isLogIn) ? "Log out":"Sign In / Log In",
                    icon:"star"
                },
                remarks:(isLogIn) ? {
                    Japanese:userName,
                    English:userName,
                    icon:"person"
                } : undefined,
                description:{
                    Japanese:"ログインをすることで記録の申請ができるようになります。ログインにはGoogleアカウントが必要です。"
                },
                to:(isLogIn) ? ()=>this.app.logout():()=>this.app.login()
            },{
                title:{
                    Japanese:"ゲームタイトル/モードの設定",
                    English:"Set Watching Title/Mode",
                    icon:"star"
                },
                remarks:{
                    Japanese:targetGameMode.ja,
                    English:targetGameMode.en,
                    icon:"person"
                },
                description:{
                    Japanese:"ここであなたが閲覧/投稿しようとしている記録が取得されたゲームタイトルとゲームモードを予め設定します。"
                },
                to:() => this.app.transition("gameSystemSelector",null)
            },{
                title:{
                    Japanese:"記録の閲覧",
                    English:"Search Record",
                    icon:"star"
                },
                description:{
                    Japanese:
                        (isSetTargetGameMode) ? `<strong>まず閲覧するゲームタイトル/モードを設定してください。</strong>` :`今までの${targetGameMode.ja}を検索して閲覧することが出来ます。`
                },
                to:(isSetTargetGameMode) ? () => this.app.transition("searchConditionSelectorView",null) : undefined
            },{
                title:{
                    Japanese:"記録の申請",
                    English:"Offer Record",
                    icon:"star"
                },
                description:{
                    Japanese:"自分の取った記録を、このページに掲示するために申請することができます。<strong>申請にはログインが必要です。</strong>"
                },
                to:(this.app.loginAdministratorReadOnly.isUserLogin) ? () => this.app.transition("offerForm",null):undefined
            }];
        }

        generateDetailMenuInfo():RequiredObjectToGenerateItem[]{
             return [{
                 title:{
                     Japanese:"新ゲームタイトル/ゲームモードの制定申請",
                     English:"「新ゲームタイトル/ゲームモードの制定申請」の訳が入る",
                     icon:"star"
                 },
                 description:{
                     Japanese:"取り扱うゲームタイトルとゲームモードを増やすことができます。"
                 }
             },{
                 title:{
                     Japanese:"クレジット",
                     English:"Credits",
                     icon:"star"
                 },
                 description:{
                     Japanese:"KSSRsを開発するにあたって、使用したツール、ライブラリなどを記しています。"
                 },
                 //#TODO ここをクレジット用に設定する。GitHubのリンクにするのもアリか？
                 to:() => {this.app.transition("gameSystemSelector",null)}
             }]
        
    }
}
type RequiredObjectToGenerateItem = {
    title:MultiLanguageStringWithICon,remarks?:MultiLanguageStringWithICon,description:MultiLanguageString,
    to?:()=>void
}
type MultiLanguageStringWithICon = MultiLanguageString & IcooonKind
interface MultiLanguageString{
    Japanese?:string;
    English?:string;
}
interface IcooonKind{
    icon:string;
}