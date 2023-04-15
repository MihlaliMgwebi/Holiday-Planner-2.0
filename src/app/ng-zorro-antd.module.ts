import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AppRoutingModule } from './app-routing.module';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  exports: [
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzDatePickerModule,
    NzTableModule,
    NzMessageModule,
    NzModalModule,
    NzSelectModule,
    NzUploadModule,
    NzDividerModule,
    NzTagModule,
  ],
})
export class NgZorroAntdModule {}
