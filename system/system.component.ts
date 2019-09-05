import { Component, HostBinding } from '@angular/core';
import { fadeStateTrigger } from '../shared/animations/fade.animation';



@Component({
    selector: 'ir-system',
    templateUrl: './system.component.html',
    animations: [fadeStateTrigger]

})

export  class SystemComponent {
    @HostBinding('@fade') a = true;


}