import React from "react";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ThirdPartyEmailPassword, {
  Github,
  Google,
  Facebook,
  Apple,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "VietLaw",
    apiDomain: "http://localhost:8000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "",
    websiteBasePath: "",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
          Facebook.init(),
          Apple.init(),
        ],
      },
    }),
    Session.init(),
  ],
});

/* Your App */
const App = () => {
  return (
    <SuperTokensWrapper>
      <Routes>
        {/*This renders the login UI on the /auth route*/}
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
          ThirdPartyEmailPasswordPreBuiltUI,
        ])}
        {/*Your app routes*/}
      </Routes>
    </SuperTokensWrapper>
  );
};

export default App;
