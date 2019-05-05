import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Panel = 'left' | 'right';

@Injectable()
export class PanelService {
    private _activePane = new BehaviorSubject<Panel>('left');

    getActivePane(): Observable<Panel> {
        return this._activePane.asObservable();
    }

    setActivePane(state: Panel) {
        this._activePane.next(state);
    }
}