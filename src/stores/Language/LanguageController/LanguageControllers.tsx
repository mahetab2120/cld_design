import { strings } from "../Language";
import { isEmpty } from "../../../utils/Utils";
import { getItem, KEY_LANGUAGE_CONTENT, KEY_LANGUAGE_ID } from "../../../utils/PrefUtils";

export default class LanguageControllers {
  static setupDynamicLanguage = async () => {
    const languageId:any = await getItem(KEY_LANGUAGE_ID);
    const data:any = await getItem(KEY_LANGUAGE_CONTENT);
    try {
      if (!isEmpty(data)) {
        strings.setContent(
          Object.assign({},strings.getContent(), {
            [languageId]: JSON.parse(data),
          })
        );

      } else {
         // await LanguageManager.getAllLanguageListAndSetInitialLanguage();
        // resetNavigation(navigationConstants.CHANGE_LANGUAGE,{isFromSplash:true})
      }
    } catch (e) {

    }
    strings.setLanguage(languageId || "en");
  };
}
