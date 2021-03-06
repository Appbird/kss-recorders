import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { element, HTMLConverter } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";
import { MenuView, RequiredObjectToGenerateItem } from "../parts/MenuView";
import { appendElement } from "../../utility/aboutElement";
import { StateAdministrator } from "../../Administrator/StateAdminister";

export class S_MainMenu
    extends PageStateBaseClass<null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections},IAppUsedToReadAndChangePage>{
        private htmlConverter:HTMLConverter;
        constructor(app:IAppUsedToReadAndChangePage,articleDOM:HTMLElement,required:null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections}) {
            super(app,articleDOM,required)
            this.htmlConverter = new HTMLConverter(this.app.state.language)
        }
        async init(){
            //#CTODO ここに機能へつながるリンクを列挙する。ヘッダをクリックするとこのページに遷移する。
            this.generateLoadingSpinner("star")
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
            
            this.deleteLoadingSpinner();
        }


        generateMainMenuInfo():RequiredObjectToGenerateItem[]{
           const runnerInfo = (this.app.loginAdministratorReadOnly.isUserLogin) ? this.app.loginAdministratorReadOnly.userInformation: undefined;
           const asg = this.app.state.gameSystemEnvDisplayed;
           const isSetTargetGameMode = asg.gameSystem!==null && asg.gameMode!==null

           const isLogIn = this.app.loginAdministratorReadOnly.isUserLogin;
           const userName = (isLogIn) ? this.app.loginAdministratorReadOnly.loginUserName:"";
           const targetGameMode = {
               ja:(isSetTargetGameMode) ? `${asg.gameSystem?.Japanese} / ${asg.gameMode?.Japanese}`:`未設定`,
               en:(isSetTargetGameMode) ? `${asg.gameSystem?.English} / ${asg.gameMode?.English}`:`未設定`
           }
           
           //#CTODO まともに日本語訳をする
            return [{
                title:{
                    Japanese:(isLogIn) ?  "ログアウト":"サインイン / ログイン",
                    English:(isLogIn) ? "Log out":"Sign In / Log In",
                    icon:(isLogIn) ? "logout":"login"
                },
                remarks:(isLogIn) ? {
                    ...userName,
                    icon:"person"
                } : undefined,
                description:{
                    Japanese: (isLogIn) ? "サービスからログアウトします。" : "ログインをすると記録の申請ができるようになります。ログインにはGoogleアカウントが必要です。",
                    English: (isLogIn) ? "Logout from KSSRs" : "It is necessary for users who want to post their records to login. Login requires your google account."
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
                    Japanese:"ここであなたが閲覧/投稿しようとしている記録が取得されたゲームタイトルとゲームモードを予め設定します。",
                    English: "Set your <strong>target gamemode</strong> to look records posted to KSSRs."
                },
                isDisabled:false,
                biggerTitle:true,
                to:() => this.app.transition("gameSystemSelector",null)
            },
            {
                title:{
                    Japanese:"ユーザーページ",
                    English:"User Page",
                    icon:"person"
                },
                description:{
                    Japanese: (isLogIn) ? "あなたのユーザーページを見ることが出来ます。" : "ログインしてください。",
                    English: (isLogIn) ? "clicking here takes you to your page." : "You need to login first to see here."
                },
                isDisabled:!this.app.loginAdministratorReadOnly.isUserLogin,
                biggerTitle:true,
                to:() => {
                    if(StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) this.app.transition("userPageInSpecific",{...this.app.state.gameSystemEnvDisplayed,runnerID:this.app.loginAdministratorReadOnly.loginUserID})
                    else  this.app.transition("userPageInWhole",{runnerID:this.app.loginAdministratorReadOnly.loginUserID})
                }
            },{
                title:{
                    Japanese:"通知",
                    English:"Notification",
                    icon:"notification"
                },
                remarks:{
                    Japanese:`<strong class="u-redChara">${(runnerInfo === undefined || runnerInfo.numberOfUnreadNotification === 0) ? "":runnerInfo.numberOfUnreadNotification+"件の未読"}</strong>`,
                    English:`<strong class="u-redChara">${(runnerInfo === undefined || runnerInfo.numberOfUnreadNotification === 0) ? "":runnerInfo.numberOfUnreadNotification+" unread notifications"}</strong>`,
                    icon:""
                },
                description:{
                    Japanese: "通知を確認することが出来ます。",
                    English: "You can check notifications from the service here."
                },
                isDisabled:!this.app.loginAdministratorReadOnly.isUserLogin,
                biggerTitle:true,
                to:() => this.app.transition("notificationList",null)
            },{
                title:{
                    Japanese:"記録の閲覧",
                    English:"Search Record",
                    icon:"menu"
                },
                description:{
                    Japanese:
                        (isSetTargetGameMode) ?  `今までの「${targetGameMode.ja}」の記録を検索して閲覧することが出来ます。`:`<strong>閲覧するゲームタイトル/モードを設定してください。</strong>`,
                    English:
                        (isSetTargetGameMode) ?  `In this page, you can search records in ${targetGameMode.en}.`:`<strong>You need to set your target gamemode first.</strong>`
                
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
                    })(),
                    English:(() => {
                        if (!isLogIn) return "<strong>Login is indispensable to submit your record.</strong>"
                        if (!isSetTargetGameMode) return "<strong>Setting your target gamemode is indispensable to submit your record.</strong>"
                        return "You can submit your record to KSSRs here."
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
                    English:"Setting New Titles/Gamemodes",
                    icon:"feather"
                },
                description:{
                    Japanese:"取り扱うゲームタイトルとゲームモードを増やすことができます。",
                    English:"Setting these enables KSSRs to cover more titles/gamemodes."
                },
                isDisabled:!this.app.loginAdministratorReadOnly.isUserLogin,
                to:() => {this.app.transition("settingNewRegulation_CollectionViewer",null,{ifAppendHistory:false})},
                biggerTitle:true,
            },{
                title:{
                    Japanese:"クレジット",
                    English:"Credits",
                    icon:"writing"
                },
                description:{
                    Japanese:"KSSRsを開発するにあたって、使用したツール、ライブラリなどを記しています。",
                    English:"Frameworks, tools and etc which I use for developing KSSRs are written in this page."
                },
                isDisabled:false,
                biggerTitle:true,
                //#TODO ここをクレジット用に設定する。GitHubのリンクにするのもアリか？
                to:() => {this.app.transition("credits",null)}
            },{
                title:{
                    Japanese:"ローディングスピナーを見る",
                    English:"See Loading Spinner",
                    icon:"writing"
                },
                description:{
                    Japanese:"KSSRsのローディングスピナーを閲覧することが出来ます。",
                    English:"You can see loading-spinners in KSSRs."
                },
                isDisabled:false,
                biggerTitle:false,
                to:() => {this.app.transition("spinnerExhibition",null)}
            }]
    }
}

