import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
    @Input() loadingText = 'Loading...';
}
