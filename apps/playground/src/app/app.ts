import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ThemeService } from "@ngx-cupertino/core";
import { CupButton } from "@ngx-cupertino/ui";

@Component({
    imports: [RouterModule, CupButton],
    selector: "cup-root",
    templateUrl: "./app.html",
    styleUrl: "./app.scss",
})
export class App {
    private readonly themeService = inject(ThemeService);
    readonly isDark = this.themeService.isDark;

    toggleTheme(): void {
        this.themeService.toggle();
    }
}
