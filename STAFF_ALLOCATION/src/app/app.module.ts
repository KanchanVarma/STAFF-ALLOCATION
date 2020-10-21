import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';// import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter'
import localeIn from '@angular/common/locales/en-IN';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentComponent } from './component/component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchresourceComponent } from './component/searchresource/searchresource.component';
import { RequestresourceComponent } from './component/requestresource/requestresource.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AllocateresourceComponent } from './component/allocateresource/allocateresource.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
// import{ MatFileUploadQueue} from './component/matFileUploadQueue/matFileUploadQueue';
import {MatSelectModule} from '@angular/material/select';
import { ResourcesallocationlistComponent } from './component/resourcesallocationlist/resourcesallocationlist.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ApproverejectresourceComponent } from './component/approverejectresource/approverejectresource.component';
import { CreateprojectComponent } from './component/createproject/createproject.component';
import { CreateresourceComponent } from './component/createresource/createresource.component';
import { HeaderComponent } from './header/header.component';
import { ReleaseResourceComponent } from './component/release-resource/release-resource.component';
import { ViewresourceComponent } from './component/viewresource/viewresource.component';
import { ExitresourceComponent } from './component/exitresource/exitresource.component';
import { SearchresourcerequestComponent } from './component/searchresourcerequest/searchresourcerequest.component';
import { RequestNewHireComponent } from './component/request-new-hire/request-new-hire.component';
import { ProjectManagementComponent } from './component/search-project/search-project.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProjectManagerDashboardComponent } from './component/dashboard/project-manager-dashboard/project-manager-dashboard.component';
import { ResourceManagerDashboardComponent } from './component/dashboard/resource-manager-dashboard/resource-manager-dashboard.component'
import { MatTabsModule, MatAutocompleteModule, MatInputModule, MatDatepickerModule, MatCardModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatDivider, MatDividerModule, MatTableModule, MatTableDataSource, MatPaginatorModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatListModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTooltipModule, MatTreeModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { ApproveResourceComponent } from './component/approve-resource/approve-resource.component';
import { ApproveNewHireComponent } from './component/approve-new-hire/approve-new-hire.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PrimarySkillComponent } from './component/masters/primary-skill/primary-skill.component';
import { SecondarySkillComponent } from './component/masters/secondary-skill/secondary-skill.component';
import { DomainComponent } from './component/masters/domain/domain.component';
import { ClientComponent } from './component/masters/client/client.component';
import { LocationComponent } from './component/masters/location/location.component';
import { UserComponent } from './component/masters/user/user.component';
import { DepartmentComponent } from './component/masters/department/department.component';
import { FinanceDashboardComponent } from './component/dashboard/finance-dashboard/finance-dashboard.component';
import { HRDashboardComponent } from './component/dashboard/hrdashboard/hrdashboard.component';
import { MonthlyAllocationRptComponent } from './component/monthly-allocation-rpt/monthly-allocation-rpt.component';
import{ ControlMessagesComponent} from './component/control-messages.component';
import { ValidationService } from './services/validation.service';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import {PopoverModule} from 'ngx-smart-popover'
import { RegMatch } from './constants/string-pipe';
import { HighlightDirective } from './constants/click-outside';

@NgModule({
  declarations: [
    RegMatch,
    AppComponent,
    ComponentComponent,
    NavbarComponent,
    FooterComponent,
    SearchresourceComponent,
    RequestresourceComponent,
    AllocateresourceComponent,
    ResourcesallocationlistComponent,
    ApproverejectresourceComponent,
    LoginComponent,
    DashboardComponent,
    CreateprojectComponent,
    CreateresourceComponent,
    HeaderComponent,
    ReleaseResourceComponent,
    ViewresourceComponent,
    ExitresourceComponent,
    SearchresourcerequestComponent,
    RequestNewHireComponent,
    ProjectManagementComponent,
    ProjectManagerDashboardComponent,
    ResourceManagerDashboardComponent,
    ApproveResourceComponent,
    ApproveNewHireComponent,
    PrimarySkillComponent,
    SecondarySkillComponent,
    DomainComponent,
    ClientComponent,
    LocationComponent,
    UserComponent,
    DepartmentComponent,
    FinanceDashboardComponent,
    HRDashboardComponent,
    MonthlyAllocationRptComponent,
    ControlMessagesComponent,
    HighlightDirective
  ],
  imports: [
    MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
    MatTabsModule,
    MatIconModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
      
    }),
    
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0)', 
      backdropBorderRadius: '14px',
	  primaryColour:'#abbd81',
	  secondaryColour:'#f37e60',
	  tertiaryColour:'#f8b26a'
  }),
  PopoverModule,

  ],
  providers: [ValidationService,
    
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    // {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: 'en-in' }}
 ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){}
 }
