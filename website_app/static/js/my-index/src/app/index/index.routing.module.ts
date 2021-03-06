import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { MainPageComponent } from './index/main_page.component';
import { SendAuthEmailComponent, VerifyEmailEffectComponent } from './send_auth_email/send_auth_email.component';
import { ImageSeriesListComponent } from './image_series_list/image_series_list.component';
import { ImageListComponent } from './image_list/image_list.component';
import { ImageDetailComponent } from './image_detail/image_detail.component';
import { FilterImageListComponent } from './filter_image_list/filter_image_list.component';
import { UserPageComponent } from './user_page/user_page.component';
import { UserInfoComponent } from './user_page/user_info/user_info.component';
import { ExchangeCodeComponent } from './user_page/exchange_code/exchange_code.component';
import { UserCollectComponent } from './user_page/user_collect/user_collect.component';
import { UserSeriesCollectComponent } from './user_page/user_series_collect/user_series_collect.component';
import { UserChangePasswordComponent } from './user_page/change_password/change_password.component';
import { ArticleComponent } from './article/article.component';

import { AuthEmailGuard } from '../common/auth_email/auth_email.service';

// 根路由器
const routes: Routes = [
	{ 
		path: '',  	
		children: [
			{ path: '', component: MainPageComponent },
			{ path: 'image_series_list/:id', component: ImageSeriesListComponent },
			{ path: 'image_list/:id', component: ImageListComponent },
			{ path: 'image_detail/:id', component: ImageDetailComponent },
			{ path: 'filter_image_list', component: FilterImageListComponent },
			{ path: 'auth_email',  component: SendAuthEmailComponent },
			{ path: 'verify_email_effect', component: VerifyEmailEffectComponent },
			{ path: 'article/:id', component: ArticleComponent },
			{ 
				path: 'user', 
				component: UserPageComponent,
				children: [
					{ path: '', redirectTo: 'user_info', pathMatch: 'full' },
					{ path: 'user_info', component: UserInfoComponent },
					{ path: 'exchange_code', component: ExchangeCodeComponent },
					{ path: 'user_collect', component: UserCollectComponent },
					{ path: 'user_series_collect', component: UserSeriesCollectComponent },
					{ path: 'user_change_password', component: UserChangePasswordComponent }
				]
			}
		]
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
	exports: [ RouterModule ]
})
export class IndexRoutingModule {}