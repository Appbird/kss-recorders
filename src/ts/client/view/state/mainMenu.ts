import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { element, HTMLConverter } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";
import { MenuView, RequiredObjectToGenerateItem } from "../parts/MenuView";
import { appendElement } from "../../utility/aboutElement";

export class S_MainMenu
    extends PageStateBaseClass<null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections},IAppUsedToReadAndChangePage>{
        private htmlConverter:HTMLConverter;
        constructor(app:IAppUsedToReadAndChangePage,articleDOM:HTMLElement,required:null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections}) {
            super(app,articleDOM,required)
            this.htmlConverter = new HTMLConverter(this.app.state.language)
        }
        init(){
            //#CTODO ここに機能へつながるリンクを列挙する。ヘッダをクリックするとこのページに遷移する。
            
            if (this.requiredObj !== null) this.app.changeTargetGameMode(this.requiredObj);

            const main = this.articleDOM.appendChild(this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="c-title u-width95per">
                    <div class="c-title__main">Welcome to Kirby-Speed/Score-Recorders!</div>
                </div>
                <hr noshade class="u-thin">
                <div class="u-width95per">${{Japanese:"ここでは、「星のカービィ」シリーズにおけるゲームのスコア/タイムを記録したり、閲覧することができます。"}}</div>
                
                <div class="u-space2em"></div>
                <div class="u-width90per">
            </div>
            `) as HTMLElement;


            const mainMenu = new MenuView(appendElement(main,"div"),this.app.state.language,{
                Japanese:"メインメニュー",
                English:"Main menu"
            })
            this.generateMainMenuInfo().map((info) => mainMenu.generateMenuItem(info));
            main.appendChild(element`<div class="u-space3em"></div>`)

            const detailMenu = new MenuView(appendElement(main,"div"),this.app.state.language,{
                Japanese:"詳細設定 / その他",
                English:"Detail Settings / etc."
            })
            this.generateDetailMenuInfo().map(info => detailMenu.generateMenuItem(info));
            main.appendChild(element`<div class="u-space3em"></div>`)

        }


        generateMainMenuInfo():RequiredObjectToGenerateItem[]{
           const asg = this.app.state.gameSystemEnvDisplayed;
           const isSetTargetGameMode = asg.gameSystem!==null && asg.gameMode!==null

           const isLogIn = this.app.loginAdministratorReadOnly.isUserLogin;
           const userName = (isLogIn) ? this.app.loginAdministratorReadOnly.loginUserName:"";
           const targetGameMode = {
               ja:(isSetTargetGameMode) ? `${asg.gameSystem?.Japanese} / ${asg.gameMode?.Japanese}`:`未設定`,
               en:(isSetTargetGameMode) ? `${asg.gameSystem?.English} / ${asg.gameMode?.English}`:`未設定`
           }
           //#TODO まともに日本語訳をする
            return [{
                title:{
                    Japanese:(isLogIn) ?  "ログアウト":"サインイン / ログイン",
                    English:(isLogIn) ? "Log out":"Sign In / Log In",
                    icon:(isLogIn) ? "logout":"login"
                },
                remarks:(isLogIn) ? {
                    Japanese:String(userName),
                    English:String(userName),
                    icon:"person"
                } : undefined,
                description:{
                    Japanese: (isLogIn) ? "サービスからログアウトします。" : "ログインをすると記録の申請ができるようになります。ログインにはGoogleアカウントが必要です。"
                },
                isDisabled:false,
                biggerTitle:true,
                to:() => {
                    (isLogIn) ? this.app.logout():this.app.login()
                }
            },{
                title:{
                    Japanese:"ゲームタイトル/モードの設定",
                    English:"Set Watching Title/Mode",
                    icon:"star"
                },
                remarks:{
                    Japanese:targetGameMode.ja,
                    English:targetGameMode.en,
                    icon:"ds"
                },
                description:{
                    Japanese:"ここであなたが閲覧/投稿しようとしている記録が取得されたゲームタイトルとゲームモードを予め設定します。"
                },
                isDisabled:false,
                biggerTitle:true,
                to:() => this.app.transition("gameSystemSelector",null)
            },{
                title:{
                    Japanese:"記録の閲覧",
                    English:"Search Record",
                    icon:"menu"
                },
                description:{
                    Japanese:
                        (isSetTargetGameMode) ?  `今までの${targetGameMode.ja}を検索して閲覧することが出来ます。`:`<strong>閲覧するゲームタイトル/モードを設定してください。</strong>`
                },
                isDisabled:!isSetTargetGameMode,
                biggerTitle:true,
                to:(isSetTargetGameMode) ? () => this.app.transition("searchConditionSelectorView",null) : undefined
            },{
                title:{
                    Japanese:"記録の申請",
                    English:"Offer Record",
                    icon:"cloud"
                },
                description:{
                    Japanese:(() => {
                        if (!isLogIn) return "<strong>申請にはログインが必要です。</strong>"
                        if (!isSetTargetGameMode) return "<strong>閲覧するゲームタイトル/モードを設定してください。</strong>"
                        return "自分の取った記録を、このページに掲示するために申請することができます。"
                    })()
                },
                isDisabled:!isSetTargetGameMode || !isLogIn,
                biggerTitle:true,
                to:(this.app.loginAdministratorReadOnly.isUserLogin) ? () => this.app.transition("offerForm",null):undefined
            }];
        }

        generateDetailMenuInfo():RequiredObjectToGenerateItem[]{
             return [{
                title:{
                    Japanese:"新ゲームタイトル/ゲームモードの制定申請",
                    English:"「新ゲームタイトル/ゲームモードの制定申請」の訳が入る",
                    icon:"feather"
                },
                description:{
                    Japanese:"取り扱うゲームタイトルとゲームモードを増やすことができます。"
                },
                isDisabled:!this.app.loginAdministratorReadOnly.isUserLogin,
                to:() => {this.app.transition("settingNewRegulation_CollectionViewer",null)},
                biggerTitle:true,
            },{
                title:{
                    Japanese:"クレジット",
                    English:"Credits",
                    icon:"writing"
                },
                description:{
                    Japanese:"KSSRsを開発するにあたって、使用したツール、ライブラリなどを記しています。"
                },
                isDisabled:false,
                biggerTitle:true,
                //#TODO ここをクレジット用に設定する。GitHubのリンクにするのもアリか？
                to:() => {this.app.transition("gameSystemSelector",null)}
            }]
    }
}

