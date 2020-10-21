import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentComponent } from './component/component.component';
import { SearchresourceComponent } from './component/searchresource/searchresource.component';
import { RequestresourceComponent } from './component/requestresource/requestresource.component';
import { AllocateresourceComponent } from './component/allocateresource/allocateresource.component';
import { ResourcesallocationlistComponent } from './component/resourcesallocationlist/resourcesallocationlist.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ApproverejectresourceComponent } from './component/approverejectresource/approverejectresource.component';
import { CreateprojectComponent } from './component/createproject/createproject.component';
import { ReleaseResourceComponent } from './component/release-resource/release-resource.component';
import { ViewresourceComponent } from './component/viewresource/viewresource.component';
import { ExitresourceComponent } from './component/exitresource/exitresource.component';
import { CreateresourceComponent } from './component/createresource/createresource.component';
import { SearchresourcerequestComponent } from './component/searchresourcerequest/searchresourcerequest.component';
import { RequestNewHireComponent } from './component/request-new-hire/request-new-hire.component';
import { ProjectManagementComponent } from './component/search-project/search-project.component';
import { ProjectManagerDashboardComponent } from './component/dashboard/project-manager-dashboard/project-manager-dashboard.component';
import { ResourceManagerDashboardComponent } from './component/dashboard/resource-manager-dashboard/resource-manager-dashboard.component';
import { ApproveResourceComponent } from './component/approve-resource/approve-resource.component';
import { ApproveNewHireComponent } from './component/approve-new-hire/approve-new-hire.component';
import { ClientComponent } from './component/masters/client/client.component';
import { UserComponent } from './component/masters/user/user.component';
import { DepartmentComponent } from './component/masters/department/department.component';
import { PrimarySkillComponent } from './component/masters/primary-skill/primary-skill.component';
import { SecondarySkillComponent } from './component/masters/secondary-skill/secondary-skill.component';
import { LocationComponent } from './component/masters/location/location.component';
import { DomainComponent } from './component/masters/domain/domain.component';
import { FinanceDashboardComponent } from './component/dashboard/finance-dashboard/finance-dashboard.component';
import { HRDashboardComponent } from './component/dashboard/hrdashboard/hrdashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { MonthlyAllocationRptComponent } from './component/monthly-allocation-rpt/monthly-allocation-rpt.component';


const routes: Routes = [
  /*  { path: '', redirectTo:'/component', pathMatch: 'full' }, */
  { path: '', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', component: ComponentComponent },

      { path: 'Project/Create', component: CreateprojectComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'finance','rm'],update:['delivery','rm'] } },
      { path: 'Project/Search', component: ProjectManagementComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'finance', 'delivery', 'rm'] } },
      { path: 'Resource/Create', component: CreateresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'hr','rm'] ,update:['rm','delivery']} },
      { path: 'Resource/Search', component: SearchresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'hr', 'delivery', 'rm'] } },
      { path: 'Resource/Allocate', component: AllocateresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'delivery','rm'] } },
      { path: 'Resource/Approve', component: ApproveResourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'rm'] } },
      { path: 'Resource/NewHire/Request', component: RequestNewHireComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'delivery'] } },
      { path: 'Resource/NewHire/Approve', component: ApproveNewHireComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'rm'] } },
      { path: 'Resourcesallocationlist', component: ResourcesallocationlistComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin',] } },
      { path: 'approverejectresource', component: ApproverejectresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin',] } },
      { path: 'Resource/Release', component: ReleaseResourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin','rm'] } },
      { path: 'Viewresource', component: ViewresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin'] } },
      { path: 'ApproveResourceList', component: ApproverejectresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin',] } },
      { path: 'Exitresource', component: ExitresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin',] } },
      { path: 'Requestresource', component: RequestresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin',] } },
      { path: 'Searchresourcerequest', component: SearchresourcerequestComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin',] } },
      { path: 'ProjectManagerDashboard', component: ProjectManagerDashboardComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'delivery'] } },
      { path: 'ResourceManagerDashboard', component: ResourceManagerDashboardComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'rm'] } },
      { path: 'HRDashboard', component: HRDashboardComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'hr'] } },
      { path: 'Requestresource', component: RequestresourceComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin',] } },
      { path: 'FinanceDashboard', component: FinanceDashboardComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'finance'] } },
      { path: 'MonthAllocationRpt', component:MonthlyAllocationRptComponent}

    ]
  },
  {
    path: 'master', component: DashboardComponent,
    children: [
      { path: 'client', component: ClientComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'rm'] } },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin','rm'] } },
      { path: 'department', component: DepartmentComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin','rm'] } },
      { path: 'primarySkill', component: PrimarySkillComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin','rm'] } },
      { path: 'secondarySkill', component: SecondarySkillComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin','rm'] } },
      { path: 'domain', component: DomainComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin','rm'] } },
      { path: 'location', component: LocationComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin','rm'] } },
    ]
  }
  //    { path:'component', component: ComponentComponent}, 
  //   { 
  //     path: '',
  //     children: [
  //       { path:'', component: ComponentComponent},
  //       { path: 'searchresource', component: SearchresourceComponent },
  //       { path: 'Requestresource', component: RequestresourceComponent },
  //       { path: 'Allocateresource', component: AllocateresourceComponent },
  //       { path: 'Resourcesallocationlist', component: ResourcesallocationlistComponent },
  //       ]
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
