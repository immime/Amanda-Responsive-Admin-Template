/*
 * 	Additional function for filemanager.html
 *	Written by ThemePixels	
 *	http://themepixels.com/
 *
 *	Copyright (c) 2012 ThemePixels (http://themepixels.com)
 *	
 *	Built for Amanda Premium Responsive Admin Template
 *  http://themeforest.net/category/site-templates/admin-templates
 */

jQuery(document).ready(function(){

	///// SEARCH FILE ON FOCUS /////
	jQuery('#filekeyword').bind('focusin focusout', function(e){
		var t = jQuery(this);
		if(e.type == 'focusin' && t.val() == 'Search file here') {
			t.val('');
		} else if(e.type == 'focusout' && t.val() == '') {
			t.val('Search file here');	
		}
	});
	
	
	///// LIST OF FILES: CLICK TO SELECT /////
	jQuery('.listfile a').click(function(e){
		var parent = jQuery(this).parent(); 
		if(!e.ctrlKey && !e.cmdKey){
         	jQuery('.listfile li.selected').removeClass('selected');  
        }
		if(!parent.hasClass('selected')) {
			parent.addClass('selected');
			
			if(jQuery('.filemgr_menu a.trash').hasClass('trash_disabled'))
				jQuery('.filemgr_menu a.trash').removeClass('trash_disabled');
			enablePreview(parent);
		} else {
			parent.removeClass('selected');
			disableTrash();
			enablePreview(parent);
		}
		return false;
	});
	
	///// ENABLE PREVIEW IF ONE ITEM IS SELECTED /////
	function enablePreview(parent) {
		var selected = jQuery('.listfile li.selected').length;
		if(selected == 0) {
			jQuery('.filemgr_menu a.preview').addClass('preview_disabled');
			jQuery('.filemgr_menu a.preview').removeClass('cboxElement');
			jQuery('.filemgr_menu a.preview').removeAttr('href');
		} else if(selected == 1) {
			var url = jQuery('.listfile li.selected a').attr('href');
			jQuery('.filemgr_menu a.preview').attr('href',url);
			jQuery('.filemgr_menu a.preview').removeClass('preview_disabled');
			if(parent.find('span.img').length > 0) {
				jQuery('.filemgr_menu a.preview').colorbox();
			} else {
				jQuery('.filemgr_menu a.preview')
				.attr('target','_blank')
				.removeClass('cboxElement');
			}
		} else {
			jQuery('.filemgr_menu a.preview').addClass('preview_disabled');
			jQuery('.filemgr_menu a.preview').removeClass('cboxElement');
			jQuery('.filemgr_menu a.preview').removeAttr('href');
		}
	}
	
	
	///// IF NO ITEM SELECTED, THEN DISABLE TRASH
	function disableTrash() {
		var r = true;
		jQuery('.listfile li').each(function(){
			if(jQuery(this).hasClass('selected'))
				r = false;
		});
		if(r)
			jQuery('.filemgr_menu a.trash').addClass('trash_disabled');
	}
	
	///// UNSELECT ALL IF CLICK OUTSIDE OF THE ITEMS /////
	jQuery(document).click(function(e) {
		if(!jQuery(e.target).is('.listfile li') && !jQuery(e.target).is('.filemgr_menu a')) {
			jQuery('.listfile li.selected').removeClass('selected');	
			jQuery('.filemgr_menu a.preview')
			.removeClass('cboxElement')
			.removeAttr('href')
			.addClass('preview_disabled');
			jQuery('.filemgr_menu a.trash').addClass('trash_disabled');
		}
	});
	
	///// RETURN FALSE IF COLORBOX IS DISABLED /////
	jQuery('.filemgr_menu a.preview').live('click',function(){
		if(!jQuery(this).hasClass('cboxElement') && !jQuery(this).attr('target'))
			return false;
	});
	
	
	///// TRASH BUTTON /////
	jQuery('.filemgr_menu a.trash').click(function(){
		if(!jQuery(this).hasClass('trash_disabled')) {
			jConfirm('This will delete selected items. Continue?', 'Delete Selected', function(r) {
				if(r) {
					jQuery('.listfile li.selected').each(function(){
						jQuery(this).fadeOut('slow',function(){
							jQuery(this).remove();
						});
					});
					jQuery.jGrowl('File successfully deleted', { life: 5000, position: 'center', theme: 'yellowgrowl'});
				}
			});
		}
	});
	
	
	///// SELECT ALL FILES /////
	jQuery('.selectall').click(function(){
		if(jQuery(this).hasClass('clicked')) {
			jQuery(this).removeClass('clicked');
			jQuery('.listfile li').removeClass('selected');
			jQuery(this).text('Select All');
			jQuery('.filemgr_menu a.trash').addClass('trash_disabled');
		} else {
			jQuery(this).addClass('clicked');
			jQuery('.listfile li').addClass('selected');
			jQuery(this).text('Select None');
			jQuery('.filemgr_menu a.trash').removeClass('trash_disabled');
		}
	});
	

});