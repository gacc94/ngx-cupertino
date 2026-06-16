import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideCupertino } from "@ngx-cupertino/core";
import { ALL_ICONS, provideCupIcons } from "@ngx-cupertino/ui";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    // Playground/demo: register the full built-in set. App code should register only what it uses.
    providers: [provideRouter(appRoutes), provideCupertino({ theme: "auto" }), provideCupIcons(...ALL_ICONS)],
};
