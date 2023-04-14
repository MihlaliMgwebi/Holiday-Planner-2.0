import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  exports: [NzFormModule, NzInputModule],
})
export class NgZorroAntdModule {}
