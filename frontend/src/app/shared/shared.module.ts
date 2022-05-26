import { NgModule } from '@angular/core';
import { MillionPipe } from './pipes/million.pipe';

const ModuleComponents = [
    MillionPipe,
]

@NgModule({
    declarations: [
        ...ModuleComponents,
    ],
    exports: [
        ...ModuleComponents,
    ]
})
export class SharedModule {
}
