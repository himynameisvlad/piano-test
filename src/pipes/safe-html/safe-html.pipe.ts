import { Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml'
})
export class SafeHtmlPipe {
    constructor(private domSanitizer: DomSanitizer) {}

    transform(text: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(text);
    }
}
