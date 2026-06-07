import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CupIcon } from "@ngx-cupertino/icons";
import { CupToggle } from "@ngx-cupertino/ui";

@Component({
    imports: [CupToggle, CupIcon, ReactiveFormsModule, JsonPipe],
    template: `
        <div class="playground-section">
            <h2>Toggle</h2>

            <!-- ─── Basic ─── -->
            <h3>Basic</h3>
            <div class="demo-row">
                <cup-toggle [(checked)]="basicChecked">Wi-Fi</cup-toggle>
                <cup-toggle>Bluetooth</cup-toggle>
                <cup-toggle [checked]="true">Enabled by default</cup-toggle>
            </div>

            <!-- ─── Sizes ─── -->
            <h3>Sizes</h3>
            <div class="demo-row">
                <cup-toggle [(checked)]="sizeChecked" size="sm">Small</cup-toggle>
                <cup-toggle [(checked)]="sizeChecked">Medium</cup-toggle>
                <cup-toggle [(checked)]="sizeChecked" size="lg">Large</cup-toggle>
            </div>

            <!-- ─── Label Position ─── -->
            <h3>Label Position</h3>
            <div class="demo-row">
                <cup-toggle [(checked)]="labelPos" labelPosition="start">Label Start</cup-toggle>
                <cup-toggle [(checked)]="labelPos" labelPosition="end">Label End</cup-toggle>
            </div>

            <!-- ─── Disabled ─── -->
            <h3>Disabled</h3>
            <div class="demo-row">
                <cup-toggle [checked]="false" disabled>Disabled Off</cup-toggle>
                <cup-toggle [checked]="true" disabled>Disabled On</cup-toggle>
                <cup-toggle [checked]="true" disabled size="sm">Disabled Small</cup-toggle>
                <cup-toggle [checked]="true" disabled size="lg">Disabled Large</cup-toggle>
            </div>

            <!-- ─── Without Label (aria-label) ─── -->
            <h3>Without Label</h3>
            <div class="demo-row">
                <cup-toggle [(checked)]="noLabel1" ariaLabel="Mute notifications"></cup-toggle>
                <cup-toggle [(checked)]="noLabel2" ariaLabel="Airplane mode" size="sm"></cup-toggle>
                <cup-toggle [(checked)]="noLabel3" ariaLabel="Dark mode" size="lg"></cup-toggle>
            </div>

            <!-- ─── With Icon ─── -->
            <h3>With Icon</h3>
            <div class="demo-row">
                <cup-toggle [(checked)]="iconToggle1">
                    <cup-icon name="wifi" size="sm" /> Wi-Fi
                </cup-toggle>
                <cup-toggle [(checked)]="iconToggle2">
                    <cup-icon name="bluetooth" size="sm" /> Bluetooth
                </cup-toggle>
                <cup-toggle [(checked)]="iconToggle3">
                    <cup-icon name="moon" size="sm" /> Dark Mode
                </cup-toggle>
            </div>

            <!-- ─── Reactive Forms ─── -->
            <h3>Reactive Forms</h3>
            <form [formGroup]="toggleForm">
                <div class="demo-row">
                    <cup-toggle formControlName="darkMode">Dark Mode</cup-toggle>
                    <cup-toggle formControlName="notifications">Notifications</cup-toggle>
                    <cup-toggle formControlName="haptics">Haptic Feedback</cup-toggle>
                </div>
                <p class="demo-output">
                    Form value: {{ toggleForm.value | json }}
                </p>
            </form>

            <!-- ─── Settings List Pattern ─── -->
            <h3>Settings List</h3>
            <div class="settings-list">
                <cup-toggle [(checked)]="airplane" labelPosition="start">
                Airplane Mode
                </cup-toggle>
                <hr class="separator" />
                <cup-toggle [(checked)]="wifi" labelPosition="start">
                Wi-Fi
                </cup-toggle>
                <hr class="separator" />
                <cup-toggle [(checked)]="bt" labelPosition="start">
                Bluetooth
                </cup-toggle>
                <hr class="separator" />
                <cup-toggle [(checked)]="vpn" labelPosition="start" disabled>
                VPN
                </cup-toggle>
            </div>

            <!-- ─── Size × State Matrix ─── -->
            <h3>Size × State Matrix</h3>
            <table class="demo-matrix">
                <thead>
                <tr>
                    <th></th>
                    <th>Off</th>
                    <th>On</th>
                    <th>Disabled Off</th>
                    <th>Disabled On</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>SM</td>
                    <td><cup-toggle size="sm" ariaLabel="sm off"></cup-toggle></td>
                    <td><cup-toggle size="sm" [checked]="true" ariaLabel="sm on"></cup-toggle></td>
                    <td><cup-toggle size="sm" disabled ariaLabel="sm disabled off"></cup-toggle></td>
                    <td><cup-toggle size="sm" [checked]="true" disabled ariaLabel="sm disabled on"></cup-toggle></td>
                </tr>
                <tr>
                    <td>MD</td>
                    <td><cup-toggle ariaLabel="md off"></cup-toggle></td>
                    <td><cup-toggle [checked]="true" ariaLabel="md on"></cup-toggle></td>
                    <td><cup-toggle disabled ariaLabel="md disabled off"></cup-toggle></td>
                    <td><cup-toggle [checked]="true" disabled ariaLabel="md disabled on"></cup-toggle></td>
                </tr>
                <tr>
                    <td>LG</td>
                    <td><cup-toggle size="lg" ariaLabel="lg off"></cup-toggle></td>
                    <td><cup-toggle size="lg" [checked]="true" ariaLabel="lg on"></cup-toggle></td>
                    <td><cup-toggle size="lg" disabled ariaLabel="lg disabled off"></cup-toggle></td>
                    <td><cup-toggle size="lg" [checked]="true" disabled ariaLabel="lg disabled on"></cup-toggle></td>
                </tr>
                </tbody>
            </table>
        </div>
    `,
})
export class TogglePage {
    // Properties
    basicChecked = false;
    sizeChecked = true;
    labelPos = true;
    noLabel1 = false;
    noLabel2 = true;
    noLabel3 = false;
    iconToggle1 = true;
    iconToggle2 = false;
    iconToggle3 = true;
    airplane = false;
    wifi = true;
    bt = true;
    vpn = false;

    // Reactive Form
    toggleForm = new FormGroup({
        darkMode: new FormControl(false),
        notifications: new FormControl(true),
        haptics: new FormControl(true),
    });
}
