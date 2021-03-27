"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordGroupView = void 0;
var ViewUtility_1 = require("../utility/ViewUtility");
var TagsView_1 = require("./TagsView");
var timeUtility_1 = require("../utility/timeUtility");
var RecordGroupView = /** @class */ (function () {
    function RecordGroupView(recordGroup, options) {
        if (options === void 0) { options = {
            displayTags: { gameSystemTags: false, targetTags: false, abilityTags: true }
        }; }
        this._htmlElement = document.createElement("div");
        this._htmlElement.classList.add("c-recordCardsGroup");
        this._htmlElement.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class = \"c-recordGroupHeader\">\n            <div class=\"c-title\">\n            <div class=\"c-title__main\">", "</div>\n            <div class=\"c-title__sub\">", "</div>\n            </div>\n        <div class=\"c-stateInfo\">\n            <div class = \"c-stateInfo__unit\">\n                <div class =\"c-iconWithDescription\"> <i class=\"fas fa-list\"></i> ", " Records </div>\n                </div>\n            <div class = \"c-stateInfo__unit\">\n                <div class =\"c-iconWithDescription\"> <i class=\"fas fa-running\"></i> ", " Runners </div>\n                </div>\n            <div class = \"c-stateInfo__unit\">\n                <div class =\"c-iconWithDescription\"> <i class=\"fas fa-history\"></i> Last post </div> ", "\n                </div>\n            </div>\n        <hr noshade class=\"u-bold\">\n        </div>\n        "], ["\n        <div class = \"c-recordGroupHeader\">\n            <div class=\"c-title\">\n            <div class=\"c-title__main\">", "</div>\n            <div class=\"c-title__sub\">", "</div>\n            </div>\n        <div class=\"c-stateInfo\">\n            <div class = \"c-stateInfo__unit\">\n                <div class =\"c-iconWithDescription\"> <i class=\"fas fa-list\"></i> ", " Records </div>\n                </div>\n            <div class = \"c-stateInfo__unit\">\n                <div class =\"c-iconWithDescription\"> <i class=\"fas fa-running\"></i> ", " Runners </div>\n                </div>\n            <div class = \"c-stateInfo__unit\">\n                <div class =\"c-iconWithDescription\"> <i class=\"fas fa-history\"></i> Last post </div> ", "\n                </div>\n            </div>\n        <hr noshade class=\"u-bold\">\n        </div>\n        "])), recordGroup.groupName, "サブタイトル", recordGroup.numberOfRecords, recordGroup.numberOfRunners, timeUtility_1.convertNumberIntoDateString(recordGroup.lastPost)));
        for (var _i = 0, _a = recordGroup.records; _i < _a.length; _i++) {
            var record = _a[_i];
            this.appendRecordCard(record, options);
        }
    }
    Object.defineProperty(RecordGroupView.prototype, "htmlElement", {
        get: function () {
            return this._htmlElement;
        },
        enumerable: false,
        configurable: true
    });
    RecordGroupView.prototype.appendRecordCard = function (record, options) {
        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
        var ele = ViewUtility_1.element(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            <div class = \"c-recordCard u-width95per\">\n            <div class = \"c-title --withUnderline\">\n                <div class = \"c-title__main\">", "</div>\n                    <div class=\"c-iconWithDescription\">\n                    <i class=\"fas fa-user\"></i>", "\n                </div>\n            </div>\n\n            ", ""], ["\n            <div class = \"c-recordCard u-width95per\">\n            <div class = \"c-title --withUnderline\">\n                <div class = \"c-title__main\">", "</div>\n                    <div class=\"c-iconWithDescription\">\n                    <i class=\"fas fa-user\"></i>", "\n                </div>\n            </div>\n\n            ", ""])), timeUtility_1.converseMiliSecondsIntoTime(record.score), record.runnerName, (!options.displayTags.gameSystemTags && !options.displayTags.targetTags && options.displayTags.abilityTags) ? "" : "<hr noshade class=\"u-thin\">");
        var tagsViews = [new TagsView_1.TagsView(), new TagsView_1.TagsView()];
        var gameEnv = record.regulation.gameSystemEnvironment;
        if (options.displayTags.gameSystemTags)
            tagsViews[0].generateTag(gameEnv.gameSystemName + "/" + gameEnv.gameModeName + "/" + gameEnv.gameDifficultyName, "gameSystem");
        if (options.displayTags.targetTags)
            tagsViews[0].generateTag(record.regulation.targetName, "target");
        if (options.displayTags.abilityTags)
            for (var _i = 0, _a = record.regulation.abilityNamesOfPlayerCharacters; _i < _a.length; _i++) {
                var ability = _a[_i];
                tagsViews[1].generateTag((ability === undefined ? "Not Found" : ability), "ability");
            }
        if (options.displayTags.gameSystemTags || options.displayTags.targetTags)
            ele.appendChild(tagsViews[0].getElement());
        if (options.displayTags.abilityTags)
            ele.appendChild(tagsViews[1].getElement());
        this._htmlElement.append(ele);
    };
    return RecordGroupView;
}());
exports.RecordGroupView = RecordGroupView;
var templateObject_1, templateObject_2;
