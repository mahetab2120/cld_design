import {apiModels, constants, LanguageController} from "@teamdigipay/digipay-core-package";
import {BASE_URL, COMPANY_ID} from "../../utils/CompanyConfig";
import {getItem, getToken, setItem} from "../../utils/data/PrefUtils";
import {showDangerToast} from "../../utils/Utils";
import _ from "lodash";
import {KEY_LANGUAGE_CONTENT, KEY_LANGUAGE_ID, KEY_LANGUAGES} from "../../utils/data/PrefKeys";
import {resetNavigation} from "../../components/navigation/Navigator";
import {strings} from "../Language";

export default class LanguageManager {
    static getAllLanguageListAndSetInitialLanguage = async () => {
        LanguageController.getAllCompanyLanguageTranslationList(
            {
                companyId: COMPANY_ID,
                baseURL: BASE_URL,
                token:  getToken(),
            },
            {
                params: {
                    platform: constants.LANGUAGE_MODULES.AGENT_APP,
                },
            },
            (
                agentAppTranslationList: Array<apiModels.BaseResponseModels.GetAllCompanyTranslationList.CompanyLanguageTranslationData>
            ) => {
                if (agentAppTranslationList) {
                    let TranslationData = agentAppTranslationList;
                    LanguageController.getAllCompanyLanguageTranslationList(
                        {
                            companyId: COMPANY_ID,
                            baseURL: BASE_URL,
                            token:  getToken(),
                        },
                        {
                            params: {
                                platform: constants.LANGUAGE_MODULES.BACKEND_APIS,
                            },
                        },
                        (
                            backEndTranslationList: Array<apiModels.BaseResponseModels.GetAllCompanyTranslationList.CompanyLanguageTranslationData>
                        ) => {
                            if (backEndTranslationList) {
                                TranslationData = [
                                    ...TranslationData,
                                    ...backEndTranslationList,
                                ];
                                this.setUpLanguage(TranslationData);
                            }
                        },
                        (error: any) => {
                            showDangerToast(error);
                        }
                    );
                }
            },
            (error: any) => {
                showDangerToast(error);
            }
        );
    };

     static setUpLanguage = (languageData: any) => {
        const languageJsonFile = {};
         let selectedLanguageCode = "en";
        languageData.map(
            async (
                translationItem: apiModels.BaseResponseModels.GetAllCompanyTranslationList.CompanyLanguageTranslationData,
                index: number
            ) => {
                const labels = translationItem?.labels;
                const codeData = _.find(labels, { language_code:selectedLanguageCode });
                languageJsonFile[translationItem.label_code] = codeData?.language_message;
                if (index === languageData.length - 1) {
                    setItem(KEY_LANGUAGE_CONTENT, JSON.stringify(languageJsonFile));
                    const currentLangCode = getItem(KEY_LANGUAGE_ID);
                    setItem(KEY_LANGUAGE_ID, currentLangCode ? currentLangCode : "en");
                }
            }
        );
         const languageId =  getItem(KEY_LANGUAGE_ID);
         const data =  getItem(KEY_LANGUAGE_CONTENT);
         // console.log('KEY_LANGUAGE_CONTENT4545' + JSON.stringify(data))
         if(data){
             strings.setContent({
                 [languageId]:JSON.parse(data)
             })
         }
    };
}
