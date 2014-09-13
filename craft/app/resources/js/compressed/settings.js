/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://buildwithcraft.com/license Craft License Agreement
 @see       http://buildwithcraft.com
 @package   craft.app.resources
*/
(function(b){Craft.Tool=Garnish.Base.extend({$trigger:null,$form:null,$innerProgressBar:null,$innerProgressBar:null,toolClass:null,optionsHtml:null,buttonLabel:null,hud:null,totalActions:null,completedActions:null,loadingActions:null,queue:null,init:function(a,c,d){this.toolClass=a;this.optionsHtml=c;this.buttonLabel=d;this.$trigger=b("#tool-"+a);this.addListener(this.$trigger,"click","showHUD")},showHUD:function(a){a.stopPropagation();this.hud?this.hud.show():(this.$form=b("<form/>").html(this.optionsHtml+
'<div class="buttons"><input type="submit" class="btn submit" value="'+this.buttonLabel+'"></div>'),this.hud=new Garnish.HUD(this.$trigger,this.$form,{hudClass:"hud toolhud"}),Craft.initUiElements(this.$form),this.addListener(this.$form,"submit","onSubmit"))},onSubmit:function(a){a.preventDefault();this.progressBar?this.progressBar.resetProgressBar():this.progressBar=new Craft.ProgressBar(this.hud.$body);this.totalActions=1;this.completedActions=0;this.queue=[];this.loadingActions=0;this.currentBatchQueue=
[];this.progressBar.$progressBar.css({top:Math.round(this.hud.$body.outerHeight()/2)-6}).removeClass("hidden");this.$form.stop().animateLeft(-200,"fast");this.progressBar.$progressBar.stop().animateLeft(30,"fast",b.proxy(function(){var a=Garnish.getPostData(this.$form),a=Craft.expandPostArray(a);a.start=!0;this.loadAction({params:a})},this))},updateProgressBar:function(){this.progressBar.setProgressPercentage(100*this.completedActions/this.totalActions)},loadAction:function(a){this.loadingActions++;
"undefined"!=typeof a.confirm&&a.confirm?this.showConfirmDialog(a):this.postActionRequest(a.params)},showConfirmDialog:function(a){var c=b('<form class="modal fitted confirmmodal"/>').appendTo(Garnish.$bod),d=b('<div class="body"/>').appendTo(c).html(a.confirm),e=b('<footer class="footer"/>').appendTo(c),e=b('<div class="buttons right"/>').appendTo(e),g=b('<div class="btn">'+Craft.t("Cancel")+"</div>").appendTo(e);b('<input type="submit" class="btn submit" value="'+Craft.t("OK")+'"/>').appendTo(e);
Craft.initUiElements(d);var f=new Garnish.Modal(c,{onHide:b.proxy(this,"onActionResponse")});this.addListener(g,"click",function(){f.hide()});this.addListener(c,"submit",function(c){c.preventDefault();f.settings.onHide=b.noop;f.hide();c=Garnish.getPostData(d);c=Craft.expandPostArray(c);b.extend(c,a.params);this.postActionRequest(c)})},postActionRequest:function(a){Craft.postActionRequest("tools/performAction",{tool:this.toolClass,params:a},b.proxy(this,"onActionResponse"),{complete:b.noop})},onActionResponse:function(a,
c){this.loadingActions--;this.completedActions++;if("success"==c&&a&&a.batches)for(var d=0;d<a.batches.length;d++)a.batches[d].length&&(this.totalActions+=a.batches[d].length,this.queue.push(a.batches[d]));a&&a.error&&alert(a.error);for(this.updateProgressBar();this.loadingActions<Craft.Tool.maxConcurrentActions&&this.currentBatchQueue.length;)this.loadNextAction();this.loadingActions||(this.queue.length?(this.currentBatchQueue=this.queue.shift(),this.loadNextAction()):(a&&a.backupFile&&(d=b("<iframe/>",
{src:Craft.getActionUrl("tools/downloadBackupFile",{fileName:a.backupFile})}).hide(),this.$form.append(d)),setTimeout(b.proxy(this,"onComplete"),300)))},loadNextAction:function(){var a=this.currentBatchQueue.shift();this.loadAction(a)},onComplete:function(){this.$allDone||(this.$allDone=b('<div class="alldone" data-icon="done" />').appendTo(this.hud.$body));this.$allDone.css({top:Math.round(this.hud.$body.outerHeight()/2)-30});this.progressBar.$progressBar.animateLeft(-170,"fast");this.$allDone.animateLeft(30,
"fast");Craft.cp.runPendingTasks()}},{maxConcurrentActions:3})})(jQuery);

//# sourceMappingURL=settings.min.map
