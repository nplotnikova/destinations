import { NgModule } from '@angular/core';

import { MillionPipe } from '@app/shared/pipes/million.pipe';

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
