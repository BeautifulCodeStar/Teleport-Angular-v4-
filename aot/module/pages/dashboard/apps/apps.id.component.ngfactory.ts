/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../../../module/pages/dashboard/access-denied/access.directive';
import * as i2 from '@ngrx/store';
import * as i3 from '@angular/forms';
import * as i4 from '@angular/common';
import * as i5 from './apps.credentials.component.ngfactory';
import * as i6 from '../../../../../module/pages/dashboard/apps/apps.credentials.component';
import * as i7 from '../../../../../module/services/modal.service';
import * as i8 from '../../../../../module/pages/dashboard/apps/apps.id.component';
import * as i9 from '@angular/router';
const styles_TeleportDevPortalAppByIdComponent:any[] = ([] as any[]);
export const RenderType_TeleportDevPortalAppByIdComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_TeleportDevPortalAppByIdComponent,data:{}});
function View_TeleportDevPortalAppByIdComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),12,'div',[['class',
      'form-group']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n            '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),9,'div',[['class','col-md-10 col-md-offset-2'],['style','margin-top:15px']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),2,'button',[['class','btn btn-link'],['type','button']],(null as any),
          [[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.deleteApp()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),i0.ɵdid(4210688,(null as any),0,i1.AllowAccessDirective,
          [i0.ElementRef,i0.Renderer2,i2.Store],{allowAccess:[0,'allowAccess']},(null as any)),
      (_l()(),i0.ɵted((null as any),['Delete'])),(_l()(),i0.ɵted((null as any),['\n                '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'button',[['class','btn btn-default'],
          ['type','button']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.editApp()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵdid(4210688,(null as any),0,i1.AllowAccessDirective,
          [i0.ElementRef,i0.Renderer2,i2.Store],{allowAccess:[0,'allowAccess']},(null as any)),
      (_l()(),i0.ɵted((null as any),['Edit'])),(_l()(),i0.ɵted((null as any),['\n            '])),
      (_l()(),i0.ɵted((null as any),['\n        ']))],(_ck,_v) => {
    const currVal_0:any = 'account.applications.app.delete';
    _ck(_v,5,0,currVal_0);
    const currVal_1:any = 'account.applications.app.update';
    _ck(_v,9,0,currVal_1);
  },(null as any));
}
function View_TeleportDevPortalAppByIdComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),118,'div',[['class',
      'col-md-11']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n\n    '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),1,'h4',[['class','text-uppercase']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['Application Detail'])),(_l()(),i0.ɵted((null as any),['\n\n    '])),(_l()(),
          i0.ɵted((null as any),['\n\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          105,'form',[['class','form-horizontal'],['novalidate','']],[[2,'ng-untouched',
              (null as any)],[2,'ng-touched',(null as any)],[2,'ng-pristine',(null as any)],
              [2,'ng-dirty',(null as any)],[2,'ng-valid',(null as any)],[2,'ng-invalid',
                  (null as any)],[2,'ng-pending',(null as any)]],[[(null as any),'ngSubmit'],
              [(null as any),'submit'],[(null as any),'reset']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('submit' === en)) {
              const pd_0:any = ((<any>i0.ɵnov(_v,8).onSubmit($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('reset' === en)) {
              const pd_1:any = ((<any>i0.ɵnov(_v,8).onReset()) !== false);
              ad = (pd_1 && ad);
            }
            if (('ngSubmit' === en)) {
              const pd_2:any = ((<any>_co.saveChanges()) !== false);
              ad = (pd_2 && ad);
            }
            return ad;
          },(null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i3.ɵbf,([] as any[]),
          (null as any),(null as any)),i0.ɵdid(16384,[['editAppForm',4]],0,i3.NgForm,
          [[8,(null as any)],[8,(null as any)]],(null as any),{ngSubmit:'ngSubmit'}),
      i0.ɵprd(2048,(null as any),i3.ControlContainer,(null as any),[i3.NgForm]),i0.ɵdid(16384,
          (null as any),0,i3.NgControlStatusGroup,[i3.ControlContainer],(null as any),
          (null as any)),(_l()(),i0.ɵted((null as any),['\n\n        '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),95,'fieldset',([] as any[]),[[8,'disabled',
              0]],(null as any),(null as any),(null as any),(null as any))),(_l()(),
          i0.ɵted((null as any),['\n\n            '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','form-group']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n                '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,
          'label',[['class','col-md-2 control-label']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['ID'])),(_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),1,'div',[['class','col-md-10'],['style',
              'line-height:36px']],(null as any),(null as any),(null as any),(null as any),
              (null as any))),(_l()(),i0.ɵted((null as any),['',''])),(_l()(),i0.ɵted((null as any),
          ['\n            '])),(_l()(),i0.ɵted((null as any),['\n\n            '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),8,'div',[['class','form-group']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),1,'label',[['class','col-md-2 control-label']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['Created On'])),(_l()(),i0.ɵted((null as any),['\n                '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'div',[['class','col-md-10'],
          ['style','line-height:36px']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['',''])),i0.ɵppd(2),
      (_l()(),i0.ɵted((null as any),['\n            '])),(_l()(),i0.ɵted((null as any),
          ['\n\n            '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),8,'div',
          [['class','form-group']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),1,'label',[['class','col-md-2 control-label']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['Last Updated On'])),(_l()(),i0.ɵted((null as any),
          ['\n                '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),2,
          'div',[['class','col-md-10'],['style','line-height:36px']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),i0.ɵppd(2),(_l()(),i0.ɵted((null as any),['\n            '])),
      (_l()(),i0.ɵted((null as any),['\n\n            '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','form-group']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n                '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,
          'label',[['class','col-md-2 control-label']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['SIP Domain'])),(_l()(),i0.ɵted((null as any),['\n                '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),1,'div',[['class','col-md-10'],
          ['style','line-height:36px']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['',''])),(_l()(),
          i0.ɵted((null as any),['\n            '])),(_l()(),i0.ɵted((null as any),
          ['\n\n\n            '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),24,
          'div',[['class','form-group']],[[2,'has-error',(null as any)]],(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n                '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,
          'label',[['class','col-md-2 control-label'],['for','edit-app-name']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['Name'])),(_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),18,'div',[['class','col-md-10']],(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n                    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          9,'input',[['class','form-control'],['id','edit-app-name'],['maxlength',
              '50'],['minlength','4'],['name','appname'],['required',''],['type','text']],
          [[1,'required',0],[1,'minlength',0],[1,'maxlength',0],[2,'ng-untouched',
              (null as any)],[2,'ng-touched',(null as any)],[2,'ng-pristine',(null as any)],
              [2,'ng-dirty',(null as any)],[2,'ng-valid',(null as any)],[2,'ng-invalid',
                  (null as any)],[2,'ng-pending',(null as any)]],[[(null as any),'ngModelChange'],
              [(null as any),'input'],[(null as any),'blur'],[(null as any),'compositionstart'],
              [(null as any),'compositionend']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('input' === en)) {
              const pd_0:any = ((<any>i0.ɵnov(_v,60)._handleInput($event.target.value)) !== false);
              ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
              const pd_1:any = ((<any>i0.ɵnov(_v,60).onTouched()) !== false);
              ad = (pd_1 && ad);
            }
            if (('compositionstart' === en)) {
              const pd_2:any = ((<any>i0.ɵnov(_v,60)._compositionStart()) !== false);
              ad = (pd_2 && ad);
            }
            if (('compositionend' === en)) {
              const pd_3:any = ((<any>i0.ɵnov(_v,60)._compositionEnd($event.target.value)) !== false);
              ad = (pd_3 && ad);
            }
            if (('ngModelChange' === en)) {
              const pd_4:any = ((<any>(_co.appName = $event)) !== false);
              ad = (pd_4 && ad);
            }
            return ad;
          },(null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i3.DefaultValueAccessor,
          [i0.Renderer2,i0.ElementRef,[2,i3.COMPOSITION_BUFFER_MODE]],(null as any),
          (null as any)),i0.ɵdid(16384,(null as any),0,i3.RequiredValidator,([] as any[]),
          {required:[0,'required']},(null as any)),i0.ɵdid(540672,(null as any),0,
          i3.MinLengthValidator,([] as any[]),{minlength:[0,'minlength']},(null as any)),
      i0.ɵdid(540672,(null as any),0,i3.MaxLengthValidator,([] as any[]),{maxlength:[0,
          'maxlength']},(null as any)),i0.ɵprd(1024,(null as any),i3.NG_VALIDATORS,
          (p0_0:any,p1_0:any,p2_0:any) => {
            return [p0_0,p1_0,p2_0];
          },[i3.RequiredValidator,i3.MinLengthValidator,i3.MaxLengthValidator]),i0.ɵprd(1024,
          (null as any),i3.NG_VALUE_ACCESSOR,(p0_0:any) => {
            return [p0_0];
          },[i3.DefaultValueAccessor]),i0.ɵdid(671744,[['appname',4]],0,i3.NgModel,
          [[2,i3.ControlContainer],[2,i3.NG_VALIDATORS],[8,(null as any)],[2,i3.NG_VALUE_ACCESSOR]],
          {name:[0,'name'],model:[1,'model']},{update:'ngModelChange'}),i0.ɵprd(2048,
          (null as any),i3.NgControl,(null as any),[i3.NgModel]),i0.ɵdid(16384,(null as any),
          0,i3.NgControlStatus,[i3.NgControl],(null as any),(null as any)),(_l()(),
          i0.ɵted((null as any),['\n                    '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),4,'span',[['class','help-block']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['The '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'strong',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['application name'])),(_l()(),i0.ɵted((null as any),
          [' must be at least four characters.'])),(_l()(),i0.ɵted((null as any),['\n                '])),
      (_l()(),i0.ɵted((null as any),['\n            '])),(_l()(),i0.ɵted((null as any),
          ['\n\n            '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),16,
          'div',[['class','form-group']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n                '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),1,'label',[['class','col-md-2 control-label'],
          ['for','edit-app-notes']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted((null as any),['Notes'])),(_l()(),i0.ɵted((null as any),
          ['\n                '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),10,
          'div',[['class','col-md-10']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n                    '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),7,'input',[['class','form-control'],
          ['id','edit-app-notes'],['maxlength','200'],['name','appnotes'],['type',
              'text']],[[1,'maxlength',0],[2,'ng-untouched',(null as any)],[2,'ng-touched',
          (null as any)],[2,'ng-pristine',(null as any)],[2,'ng-dirty',(null as any)],
          [2,'ng-valid',(null as any)],[2,'ng-invalid',(null as any)],[2,'ng-pending',
              (null as any)]],[[(null as any),'ngModelChange'],[(null as any),'input'],
          [(null as any),'blur'],[(null as any),'compositionstart'],[(null as any),
              'compositionend']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('input' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,86)._handleInput($event.target.value)) !== false);
          ad = (pd_0 && ad);
        }
        if (('blur' === en)) {
          const pd_1:any = ((<any>i0.ɵnov(_v,86).onTouched()) !== false);
          ad = (pd_1 && ad);
        }
        if (('compositionstart' === en)) {
          const pd_2:any = ((<any>i0.ɵnov(_v,86)._compositionStart()) !== false);
          ad = (pd_2 && ad);
        }
        if (('compositionend' === en)) {
          const pd_3:any = ((<any>i0.ɵnov(_v,86)._compositionEnd($event.target.value)) !== false);
          ad = (pd_3 && ad);
        }
        if (('ngModelChange' === en)) {
          const pd_4:any = ((<any>(_co.appNotes = $event)) !== false);
          ad = (pd_4 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i3.DefaultValueAccessor,
          [i0.Renderer2,i0.ElementRef,[2,i3.COMPOSITION_BUFFER_MODE]],(null as any),
          (null as any)),i0.ɵdid(540672,(null as any),0,i3.MaxLengthValidator,([] as any[]),
          {maxlength:[0,'maxlength']},(null as any)),i0.ɵprd(1024,(null as any),i3.NG_VALIDATORS,
          (p0_0:any) => {
            return [p0_0];
          },[i3.MaxLengthValidator]),i0.ɵprd(1024,(null as any),i3.NG_VALUE_ACCESSOR,
          (p0_0:any) => {
            return [p0_0];
          },[i3.DefaultValueAccessor]),i0.ɵdid(671744,[['appnotes',4]],0,i3.NgModel,
          [[2,i3.ControlContainer],[2,i3.NG_VALIDATORS],[8,(null as any)],[2,i3.NG_VALUE_ACCESSOR]],
          {name:[0,'name'],model:[1,'model']},{update:'ngModelChange'}),i0.ɵprd(2048,
          (null as any),i3.NgControl,(null as any),[i3.NgModel]),i0.ɵdid(16384,(null as any),
          0,i3.NgControlStatus,[i3.NgControl],(null as any),(null as any)),(_l()(),
          i0.ɵted((null as any),['\n                '])),(_l()(),i0.ɵted((null as any),
          ['\n            '])),(_l()(),i0.ɵted((null as any),['\n\n\n            '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),10,'div',[['class','form-group hide-on-disabled']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','col-md-10 col-md-offset-2'],['style','margin-top:15px']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n                    '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),1,'button',[['class','btn btn-link'],['type',
              'button']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.cancelChanges()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['Cancel'])),
      (_l()(),i0.ɵted((null as any),['\n                    '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),1,'button',[['class','btn btn-success'],['type',
              'submit']],[[8,'disabled',0]],(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted((null as any),['Save'])),(_l()(),i0.ɵted((null as any),
          ['\n                '])),(_l()(),i0.ɵted((null as any),['\n            '])),
      (_l()(),i0.ɵted((null as any),['\n\n        '])),(_l()(),i0.ɵted((null as any),
          ['\n\n        '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_TeleportDevPortalAppByIdComponent_2)),i0.ɵdid(16384,
          (null as any),0,i4.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted((null as any),['\n\n    '])),(_l()(),i0.ɵted((null as any),
          ['\n\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'p',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),['\n\n    '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),1,'teleport-dev-portal-app-credentials',
          ([] as any[]),(null as any),(null as any),(null as any),i5.View_TeleportDevPortalAppCredentialsComponent_0,
          i5.RenderType_TeleportDevPortalAppCredentialsComponent)),i0.ɵdid(180224,
          (null as any),0,i6.TeleportDevPortalAppCredentialsComponent,[i2.Store,i2.ReducerManagerDispatcher,
              i7.ModalService],{app:[0,'app']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['\n\n']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_23:any = '';
    _ck(_v,61,0,currVal_23);
    const currVal_24:any = '4';
    _ck(_v,62,0,currVal_24);
    const currVal_25:any = '50';
    _ck(_v,63,0,currVal_25);
    const currVal_26:any = 'appname';
    const currVal_27:any = _co.appName;
    _ck(_v,66,0,currVal_26,currVal_27);
    const currVal_36:any = '200';
    _ck(_v,87,0,currVal_36);
    const currVal_37:any = 'appnotes';
    const currVal_38:any = _co.appNotes;
    _ck(_v,90,0,currVal_37,currVal_38);
    const currVal_40:boolean = !_co.isEditing;
    _ck(_v,110,0,currVal_40);
    const currVal_41:any = _co.App;
    _ck(_v,117,0,currVal_41);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i0.ɵnov(_v,10).ngClassUntouched;
    const currVal_1:any = i0.ɵnov(_v,10).ngClassTouched;
    const currVal_2:any = i0.ɵnov(_v,10).ngClassPristine;
    const currVal_3:any = i0.ɵnov(_v,10).ngClassDirty;
    const currVal_4:any = i0.ɵnov(_v,10).ngClassValid;
    const currVal_5:any = i0.ɵnov(_v,10).ngClassInvalid;
    const currVal_6:any = i0.ɵnov(_v,10).ngClassPending;
    _ck(_v,6,0,currVal_0,currVal_1,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6);
    const currVal_7:boolean = !_co.isEditing;
    _ck(_v,12,0,currVal_7);
    const currVal_8:any = _co.App.name;
    _ck(_v,20,0,currVal_8);
    const currVal_9:any = i0.ɵunv(_v,29,0,_ck(_v,30,0,i0.ɵnov((<any>_v.parent),0),
        _co.App.createdAt,'short'));
    _ck(_v,29,0,currVal_9);
    const currVal_10:any = i0.ɵunv(_v,39,0,_ck(_v,40,0,i0.ɵnov((<any>_v.parent),0),
        _co.App.lastModifiedAt,'short'));
    _ck(_v,39,0,currVal_10);
    const currVal_11:any = _co.App.sipDomains.callflows;
    _ck(_v,49,0,currVal_11);
    const currVal_12:boolean = !(i0.ɵnov(_v,66).pristine || i0.ɵnov(_v,66).valid);
    _ck(_v,52,0,currVal_12);
    const currVal_13:any = (i0.ɵnov(_v,61).required? '': (null as any));
    const currVal_14:any = (i0.ɵnov(_v,62).minlength? i0.ɵnov(_v,62).minlength: (null as any));
    const currVal_15:any = (i0.ɵnov(_v,63).maxlength? i0.ɵnov(_v,63).maxlength: (null as any));
    const currVal_16:any = i0.ɵnov(_v,68).ngClassUntouched;
    const currVal_17:any = i0.ɵnov(_v,68).ngClassTouched;
    const currVal_18:any = i0.ɵnov(_v,68).ngClassPristine;
    const currVal_19:any = i0.ɵnov(_v,68).ngClassDirty;
    const currVal_20:any = i0.ɵnov(_v,68).ngClassValid;
    const currVal_21:any = i0.ɵnov(_v,68).ngClassInvalid;
    const currVal_22:any = i0.ɵnov(_v,68).ngClassPending;
    _ck(_v,59,0,currVal_13,currVal_14,currVal_15,currVal_16,currVal_17,currVal_18,
        currVal_19,currVal_20,currVal_21,currVal_22);
    const currVal_28:any = (i0.ɵnov(_v,87).maxlength? i0.ɵnov(_v,87).maxlength: (null as any));
    const currVal_29:any = i0.ɵnov(_v,92).ngClassUntouched;
    const currVal_30:any = i0.ɵnov(_v,92).ngClassTouched;
    const currVal_31:any = i0.ɵnov(_v,92).ngClassPristine;
    const currVal_32:any = i0.ɵnov(_v,92).ngClassDirty;
    const currVal_33:any = i0.ɵnov(_v,92).ngClassValid;
    const currVal_34:any = i0.ɵnov(_v,92).ngClassInvalid;
    const currVal_35:any = i0.ɵnov(_v,92).ngClassPending;
    _ck(_v,85,0,currVal_28,currVal_29,currVal_30,currVal_31,currVal_32,currVal_33,
        currVal_34,currVal_35);
    const currVal_39:boolean = !(i0.ɵnov(_v,8).form.valid || i0.ɵnov(_v,8).form.pristine);
    _ck(_v,103,0,currVal_39);
  });
}
function View_TeleportDevPortalAppByIdComponent_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),0,'div',[['class',
      'full-block-busy']],(null as any),(null as any),(null as any),(null as any),
      (null as any)))],(null as any),(null as any));
}
export function View_TeleportDevPortalAppByIdComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[i0.ɵpid(0,i4.DatePipe,[i0.LOCALE_ID]),(_l()(),i0.ɵted((null as any),
      ['\n'])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_TeleportDevPortalAppByIdComponent_1)),i0.ɵdid(16384,(null as any),0,i4.NgIf,
      [i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),
      i0.ɵted((null as any),['\n\n'])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),
      1,(null as any),View_TeleportDevPortalAppByIdComponent_3)),i0.ɵdid(16384,(null as any),
      0,i4.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i0.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i8.TeleportDevPortalAppByIdComponent = _v.component;
    const currVal_0:any = _co.App;
    _ck(_v,3,0,currVal_0);
    const currVal_1:boolean = !_co.App;
    _ck(_v,6,0,currVal_1);
  },(null as any));
}
export function View_TeleportDevPortalAppByIdComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'teleport-dev-portal-app-detail',
      ([] as any[]),(null as any),(null as any),(null as any),View_TeleportDevPortalAppByIdComponent_0,
      RenderType_TeleportDevPortalAppByIdComponent)),i0.ɵdid(245760,(null as any),
      0,i8.TeleportDevPortalAppByIdComponent,[i9.Router,i7.ModalService,i9.ActivatedRoute,
          i2.Store,i2.ReducerManagerDispatcher],(null as any),(null as any))],(_ck,
      _v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const TeleportDevPortalAppByIdComponentNgFactory:i0.ComponentFactory<i8.TeleportDevPortalAppByIdComponent> = i0.ɵccf('teleport-dev-portal-app-detail',
    i8.TeleportDevPortalAppByIdComponent,View_TeleportDevPortalAppByIdComponent_Host_0,
    {},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvcGF0cmlja21hcnRpbi9Eb2N1bWVudHMvU2hvdXRQb2ludFByb2plY3RzL1RlbGVQb3J0L3RlbGVwb3J0LWFwcC1tb2R1bGVzL3RlbGVwb3J0LW1vZHVsZS1kZXYtcG9ydGFsL21vZHVsZS9wYWdlcy9kYXNoYm9hcmQvYXBwcy9hcHBzLmlkLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9ob21lL3BhdHJpY2ttYXJ0aW4vRG9jdW1lbnRzL1Nob3V0UG9pbnRQcm9qZWN0cy9UZWxlUG9ydC90ZWxlcG9ydC1hcHAtbW9kdWxlcy90ZWxlcG9ydC1tb2R1bGUtZGV2LXBvcnRhbC9tb2R1bGUvcGFnZXMvZGFzaGJvYXJkL2FwcHMvYXBwcy5pZC5jb21wb25lbnQudHMiLCJuZzovLy9ob21lL3BhdHJpY2ttYXJ0aW4vRG9jdW1lbnRzL1Nob3V0UG9pbnRQcm9qZWN0cy9UZWxlUG9ydC90ZWxlcG9ydC1hcHAtbW9kdWxlcy90ZWxlcG9ydC1tb2R1bGUtZGV2LXBvcnRhbC9tb2R1bGUvcGFnZXMvZGFzaGJvYXJkL2FwcHMvYXBwcy5pZC5odG1sIiwibmc6Ly8vaG9tZS9wYXRyaWNrbWFydGluL0RvY3VtZW50cy9TaG91dFBvaW50UHJvamVjdHMvVGVsZVBvcnQvdGVsZXBvcnQtYXBwLW1vZHVsZXMvdGVsZXBvcnQtbW9kdWxlLWRldi1wb3J0YWwvbW9kdWxlL3BhZ2VzL2Rhc2hib2FyZC9hcHBzL2FwcHMuaWQuY29tcG9uZW50LnRzLlRlbGVwb3J0RGV2UG9ydGFsQXBwQnlJZENvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIlxuPGRpdiBjbGFzcz1cImNvbC1tZC0xMVwiICpuZ0lmPVwiQXBwXCI+XG5cbiAgICA8aDQgY2xhc3M9XCJ0ZXh0LXVwcGVyY2FzZVwiPkFwcGxpY2F0aW9uIERldGFpbDwvaDQ+XG5cbiAgICA8IS0tcD5cbiAgICAgICAgSUQgPHN0cm9uZz57eyBBcHAubmFtZS5zbGljZSgwLCA1KSArICcuLi4nICsgQXBwLm5hbWUuc2xpY2UoLTUpIH19PC9zdHJvbmc+ICZtaWRkb3Q7XG4gICAgICAgIENyZWF0ZWQgb24gPHN0cm9uZz57eyBBcHAuY3JlYXRlZEF0IHwgZGF0ZTonc2hvcnQnIH19PC9zdHJvbmc+ICZtaWRkb3Q7XG4gICAgICAgIExhc3QgdXBkYXRlIG9uIDxzdHJvbmc+e3sgQXBwLmxhc3RNb2RpZmllZEF0IHwgZGF0ZTonc2hvcnQnIH19PC9zdHJvbmc+XG4gICAgPC9wLS0+XG5cbiAgICA8Zm9ybSBjbGFzcz1cImZvcm0taG9yaXpvbnRhbFwiIChuZ1N1Ym1pdCk9XCJzYXZlQ2hhbmdlcygpXCIgI2VkaXRBcHBGb3JtPVwibmdGb3JtXCI+XG5cbiAgICAgICAgPGZpZWxkc2V0IFtkaXNhYmxlZF09XCIhIGlzRWRpdGluZ1wiPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1tZC0yIGNvbnRyb2wtbGFiZWxcIj5JRDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6MzZweFwiPnt7IEFwcC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJjb2wtbWQtMiBjb250cm9sLWxhYmVsXCI+Q3JlYXRlZCBPbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6MzZweFwiPnt7IEFwcC5jcmVhdGVkQXQgfCBkYXRlOidzaG9ydCcgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1tZC0yIGNvbnRyb2wtbGFiZWxcIj5MYXN0IFVwZGF0ZWQgT248L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTBcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OjM2cHhcIj57eyBBcHAubGFzdE1vZGlmaWVkQXQgfCBkYXRlOidzaG9ydCcgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1tZC0yIGNvbnRyb2wtbGFiZWxcIj5TSVAgRG9tYWluPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEwXCIgc3R5bGU9XCJsaW5lLWhlaWdodDozNnB4XCI+e3sgQXBwLnNpcERvbWFpbnMuY2FsbGZsb3dzIH19PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtjbGFzcy5oYXMtZXJyb3JdPVwiIShhcHBuYW1lLnByaXN0aW5lIHx8IGFwcG5hbWUudmFsaWQpXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVkaXQtYXBwLW5hbWVcIiBjbGFzcz1cImNvbC1tZC0yIGNvbnRyb2wtbGFiZWxcIj5OYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImVkaXQtYXBwLW5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbWlubGVuZ3RoPVwiNFwiIG1heGxlbmd0aD1cIjUwXCIgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiYXBwTmFtZVwiIG5hbWU9XCJhcHBuYW1lXCIgI2FwcG5hbWU9XCJuZ01vZGVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiPlRoZSA8c3Ryb25nPmFwcGxpY2F0aW9uIG5hbWU8L3N0cm9uZz4gbXVzdCBiZSBhdCBsZWFzdCBmb3VyIGNoYXJhY3RlcnMuPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVkaXQtYXBwLW5vdGVzXCIgY2xhc3M9XCJjb2wtbWQtMiBjb250cm9sLWxhYmVsXCI+Tm90ZXM8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZWRpdC1hcHAtbm90ZXNcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbWF4bGVuZ3RoPVwiMjAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiYXBwTm90ZXNcIiBuYW1lPVwiYXBwbm90ZXNcIiAjYXBwbm90ZXM9XCJuZ01vZGVsXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBoaWRlLW9uLWRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMCBjb2wtbWQtb2Zmc2V0LTJcIiBzdHlsZT1cIm1hcmdpbi10b3A6MTVweFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlua1wiIChjbGljayk9XCJjYW5jZWxDaGFuZ2VzKClcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiBbZGlzYWJsZWRdPVwiISAoZWRpdEFwcEZvcm0uZm9ybS52YWxpZCB8fCBlZGl0QXBwRm9ybS5mb3JtLnByaXN0aW5lKVwiPlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZmllbGRzZXQ+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiAqbmdJZj1cIiEgaXNFZGl0aW5nXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEwIGNvbC1tZC1vZmZzZXQtMlwiIHN0eWxlPVwibWFyZ2luLXRvcDoxNXB4XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiAoY2xpY2spPVwiZGVsZXRlQXBwKClcIiBbYWxsb3dBY2Nlc3NdPVwiJ2FjY291bnQuYXBwbGljYXRpb25zLmFwcC5kZWxldGUnXCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwiZWRpdEFwcCgpXCIgW2FsbG93QWNjZXNzXT1cIidhY2NvdW50LmFwcGxpY2F0aW9ucy5hcHAudXBkYXRlJ1wiPkVkaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZm9ybT5cblxuICAgIDxwPiZuYnNwOzwvcD5cblxuICAgIDx0ZWxlcG9ydC1kZXYtcG9ydGFsLWFwcC1jcmVkZW50aWFscyBbYXBwXT1cIkFwcFwiPjwvdGVsZXBvcnQtZGV2LXBvcnRhbC1hcHAtY3JlZGVudGlhbHM+XG5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiZnVsbC1ibG9jay1idXN5XCIgKm5nSWY9XCIhIEFwcFwiPjwvZGl2PlxuIiwiPHRlbGVwb3J0LWRldi1wb3J0YWwtYXBwLWRldGFpbD48L3RlbGVwb3J0LWRldi1wb3J0YWwtYXBwLWRldGFpbD4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQytEUTtNQUFBO01BQTRDLG1EQUN4QztVQUFBO1VBQUE7TUFBK0QsdURBQzNEO1VBQUE7VUFBQTtZQUFBO1lBQUE7WUFBMkM7Y0FBQTtjQUFBO1lBQUE7WUFBM0M7VUFBQSx1Q0FBQTtVQUFBO01BQW1ILDJDQUFlO01BQ2xJO1VBQUE7UUFBQTtRQUFBO1FBQThDO1VBQUE7VUFBQTtRQUFBO1FBQTlDO01BQUEsdUNBQUE7VUFBQTtNQUFvSCx5Q0FBYTtNQUMvSDtJQUYrRDtJQUFqRSxXQUFpRSxTQUFqRTtJQUNrRTtJQUFsRSxXQUFrRSxTQUFsRTs7OztvQkFqRWhCO01BQUE7TUFBbUMsNkNBRS9CO1VBQUE7VUFBQSw0Q0FBMkI7VUFBQSx5QkFBdUIsNkNBTTVDO2lCQUFBLDhCQUVOO1VBQUE7Y0FBQTtjQUFBO2tCQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUE4QjtjQUFBO2NBQUE7WUFBQTtZQUE5QjtVQUFBLHVDQUFBO1VBQUEsb0NBQUE7VUFBQTthQUFBLDBFQUFBO1VBQUE7VUFBQSxlQUErRSxpREFFM0U7aUJBQUE7Y0FBQSw4REFBbUM7aUJBQUEsc0NBRS9CO1VBQUE7VUFBQSw0Q0FBd0I7VUFBQSx5QkFDcEI7VUFBQTtVQUFBLDRDQUFzQztVQUFBLFNBQVUsdURBQ2hEO2lCQUFBO2NBQUE7Y0FBQSxnQkFBZ0Qsd0NBQW9CO1VBQUEscUJBQ2xFO01BRU47VUFBQTtNQUF3Qix1REFDcEI7VUFBQTtVQUFBLDBEQUFzQztVQUFBLGlCQUFrQjtNQUN4RDtVQUFBO1VBQUEsOEJBQWdEO01BQXdDLG1EQUN0RjtVQUFBLHVCQUVOO1VBQUE7VUFBQSxnQkFBd0IsdURBQ3BCO2lCQUFBO2NBQUE7TUFBc0Msb0RBQXVCO1VBQUEseUJBQzdEO1VBQUE7VUFBQSwwREFBZ0Q7VUFBQSxxQkFBNkM7TUFDM0YscURBRU47VUFBQTtVQUFBLDRDQUF3QjtVQUFBLHlCQUNwQjtVQUFBO1VBQUEsNENBQXNDO1VBQUEsaUJBQWtCO01BQ3hEO1VBQUE7VUFBQSw4QkFBZ0Qsd0NBQW9DO2lCQUFBLG9DQUNsRjtVQUFBLHlCQUdOO1VBQUE7VUFBQSw0Q0FBaUY7VUFBQSx5QkFDN0U7VUFBQTtVQUFBLDBEQUEwRDtVQUFBLFdBQVksdURBQ3RFO2lCQUFBO2NBQUEsMERBQXVCO1VBQUEsNkJBQ25CO1VBQUE7Y0FBQTtVQUFBO2NBQUE7Y0FBQTtrQkFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFDTztjQUFBO2NBQUE7WUFBQTtZQURQO1VBQUEsdUNBQUE7VUFBQTtVQUFBLHNCQUFBO1VBQUEsZ0RBQUE7Z0NBQUE7YUFBQTtVQUFBLG9DQUFBO1VBQUE7WUFBQTtVQUFBO1VBQUE7WUFBQTtVQUFBLG9DQUFBO1VBQUE7VUFBQSxxRUFBQTtVQUFBLDhEQUFBO1VBQUEsaUVBQytEO2lCQUFBLDRDQUMvRDtVQUFBO1VBQUEsNENBQXlCO1VBQUEsV0FBSTtVQUFBO01BQVEscURBQXlCO1VBQUEseUNBQXlDO01BQ3JHLG1EQUNKO1VBQUEsdUJBRU47VUFBQTtVQUFBLDhCQUF3QjtNQUNwQjtVQUFBO1VBQUEsZ0JBQTJELDBDQUFhO1VBQUEseUJBQ3hFO1VBQUE7VUFBQSw4QkFBdUI7TUFDbkI7VUFBQTtjQUFBO1VBQUE7VUFBQTtjQUFBO1VBQUE7Y0FBQTtRQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUNPO1VBQUE7VUFBQTtRQUFBO1FBRFA7TUFBQSx1Q0FBQTtVQUFBO1VBQUEsc0JBQUE7VUFBQSxrREFBQTtVQUFBO1lBQUE7VUFBQTtVQUFBO1lBQUE7VUFBQSxvQ0FBQTtVQUFBO1VBQUEscUVBQUE7VUFBQSw4REFBQTtVQUFBLGlFQUNrRTtpQkFBQSx3Q0FDaEU7VUFBQSxxQkFDSjtNQUdOO1VBQUE7TUFBeUMsdURBQ3JDO1VBQUE7VUFBQTtNQUErRCwyREFDM0Q7VUFBQTtjQUFBO1lBQUE7WUFBQTtZQUEyQztjQUFBO2NBQUE7WUFBQTtZQUEzQztVQUFBLGdDQUFxRTtNQUFlLDJEQUNwRjtVQUFBO2NBQUE7VUFBQSxnQkFBbUgseUNBQWE7VUFBQSx5QkFDOUg7TUFDSixpREFFQztVQUFBLG1CQUVYO1VBQUEsa0VBQUE7VUFBQTtVQUFBLGVBS00sNkNBRUg7VUFBQSxlQUVQO1VBQUE7TUFBRyxzQ0FBVTtNQUViO1VBQUE7Z0VBQUEsVUFBQTtVQUFBOzZCQUFBLGlDQUF1RjtVQUFBOztJQW5DaUI7SUFBeEYsWUFBd0YsVUFBeEY7SUFBMkQ7SUFBM0QsWUFBMkQsVUFBM0Q7SUFBeUU7SUFBekUsWUFBeUUsVUFBekU7SUFDNkI7SUFBdEI7SUFEUCxZQUM2QixXQUF0QixVQURQO0lBUzREO0lBQTVELFlBQTRELFVBQTVEO0lBQzhCO0lBQXZCO0lBRFAsWUFDOEIsV0FBdkIsVUFEUDtJQWVZO0lBQXhCLGFBQXdCLFVBQXhCO0lBV2lDO0lBQXJDLGFBQXFDLFVBQXJDOzs7SUEvREE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQSxXQUFBLHFFQUFBO0lBRWM7SUFBVixZQUFVLFNBQVY7SUFJd0Q7SUFBQTtJQUtBO1FBQUE7SUFBQTtJQUtBO1FBQUE7SUFBQTtJQUtBO0lBQUE7SUFJNUI7SUFBeEIsWUFBd0IsVUFBeEI7SUFHUTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBLFlBQUEsV0FBQSxXQUFBLFdBQUE7UUFBQSwyQ0FBQTtJQVNBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQSxZQUFBLFdBQUE7UUFBQSxxQkFBQTtJQVM4QztJQUE5QyxhQUE4QyxVQUE5Qzs7OztvQkFxQnBCO01BQUE7TUFBQTs7OzBEQTlFQTtNQUFBLFNBQ0E7TUFBQSxrREFBQTtNQUFBLHNFQTJFTTthQUFBLDBCQUVOO01BQUEsa0VBQUE7TUFBQTtNQUFpRDs7SUE3RTFCO0lBQXZCLFdBQXVCLFNBQXZCO0lBNkU2QjtJQUE3QixXQUE2QixTQUE3Qjs7OztvQkM5RUE7TUFBQTtrREFBQSxVQUFBO01BQUE7OENBQUE7O0lBQUE7Ozs7OyJ9