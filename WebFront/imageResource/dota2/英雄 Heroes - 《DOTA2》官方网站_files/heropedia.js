var g_rgHeroPickerData;
var g_bHeroPickerDataReady = false;
var g_rgDisabledHeroes  = new Array();
$(document).ready(
	function() 
	{
		// see if we're on the heropicker screen
		if ( $('.heroPickerIconLink').length )
		{
			// request the hero bios
			/*$.ajax(
				{
					type:'GET',
					cache:true,
					url:'js/heropickerdata.js',
					dataType:'json',
					success:function(heroPickerJSON){ g_rgHeroPickerData = heroPickerJSON; g_bHeroPickerDataReady = true; $('#heroBioLoading').hide(); $('#heroBioDynamic').show(); $('#heroBioName').html( '请选择英雄' ); }
				}
			);*/
			
			//$.getScript('js/heropickerdata.js',function(){
			//alert(heroPickerJSON)
				g_rgHeroPickerData = heroPickerJSON; g_bHeroPickerDataReady = true; $('#heroBioLoading').hide(); $('#heroBioDynamic').show(); $('#heroBioName').html( '请选择英雄' );
			//})
			// setup hover handlers
			
			$('.heroPickerIconLink').hover( 
				// Mouse over
				function( e )
				{
					$(this).parent("li").css("z-index","10");
					HeroIconHover( e.currentTarget.id, true );
				},
				// Mouse out
				function( e )
				{
					$(".hero_list li").css("z-index","2");
					HeroIconHover( e.currentTarget.id, false );
				}
			);
		}
	}
);

function HeroIconHover( heroIconLink, bShow )
{
	if ( !g_bHeroPickerDataReady )
		return;
	
	// this is the element that fired the hover
	heroName = heroIconLink.slice( 5 );
	//TODO:临时修改替换名字，后期需要统一更改 & 同时更改heropickerdata.js
	// see if our hero is greyed out from filter selection
	if ( $.inArray( heroName, g_rgDisabledHeroes ) != -1 && bShow )
		return;
	heroIconLink = $(heroIconLink);
	
	if ( bShow )
	{
		// add bio
		$('#heroBioName').html( g_rgHeroPickerData[heroName].name );
		// build role string
		roleText = '<span class="bioTextAttack">' + g_rgHeroPickerData[heroName].atk_l + '</span> - ' + g_rgHeroPickerData[heroName].roles_l.join( ' - ' );
		$('#heroBioRoles').html( roleText );

		// show hover icon
		$('#hover_'+heroName).show();
	}
	else
	{
		// dont clear text above, but hide hover icon
		$('#hover_'+heroName).hide();
	}
}

function updateFilters()
{
	if ( !g_bHeroPickerDataReady )
		return;
	strAttackFilter = $('#filterAttack option:selected').val();
	strRoleFilter = $('#filterRole option:selected').val();
	strNameFilter = $('#filterName option:selected').val();
	g_rgDisabledHeroes = [];
	$('.heroPickerIconLink').each(
		function ()
		{
			heroName = $(this).attr('id').slice( 5 );
			if ( strAttackFilter != '' && g_rgHeroPickerData[heroName].atk != strAttackFilter )
			{
				// attack filter set, not matched
				$(this).removeClass( 'filterMatchedHero' );
				$(this).addClass( 'filterUnmatchedHero' );
				$('#filterName option[value="'+heroName+'"]').attr('disabled', true).css('color','#444444');
				g_rgDisabledHeroes.push( heroName );
			}
			else // empty or matched attack filter
			{
				if ( strRoleFilter != '' && $.inArray( strRoleFilter, g_rgHeroPickerData[heroName].roles ) == -1 )
				{
					// role filter set, not matched
					$(this).removeClass( 'filterMatchedHero' );
					$(this).addClass( 'filterUnmatchedHero' );
					$('#filterName option[value="'+heroName+'"]').attr('disabled', true).css('color','#444444');
					g_rgDisabledHeroes.push( heroName );
				}
				else // empty or matched role filter
				{
					if ( strNameFilter != '' && heroName != strNameFilter )
					{
						// name filter set, not matched
						$(this).removeClass( 'filterMatchedHero' );
						$(this).addClass( 'filterUnmatchedHero' );
						
						// if name filter is the only one active, don't disable the other names in the dropdown
						if ( strAttackFilter != '' || strRoleFilter != '' )
						{
							$('#filterName option[value="'+heroName+'"]').attr('disabled', true).css('color','#444444');
						}
						else
						{
							$('#filterName option[value="'+heroName+'"]').attr('disabled', false).css('color','#999999');
						}
						g_rgDisabledHeroes.push( heroName );
					}
					else
					{
						// filter matched
						$(this).removeClass( 'filterUnmatchedHero' );
						$(this).addClass( 'filterMatchedHero' );
						$('#filterName option[value="'+heroName+'"]').attr('disabled', false).css('color','#999999');
					}
				}
			}
		}
	);
	if ( $.inArray( strNameFilter, g_rgDisabledHeroes ) != -1 )
	{
		$('#filterName').prop( 'selectedIndex', 0 );
		return updateFilters();
	}
	
}

function BuildItemFullBoxHTML( iData )
{
	strHTML = '';
	strHTML += '<div id="itemTopRow">';
	if ( iData.created )
	{
		strHTML += '<div id="fullItemRecipeItems">';
		strHTML += '<div id="fullItemRecipeItemsTitle">Recipe:</div>';
		$.each( iData.components, 
			function( i, iName )
			{
				strHTML += '<div onClick="showItemInFullBox(\''+iName+'\', 1)" style="cursor:pointer" itemname="'+iName+'" class="floatRecipeImage itemIconWithTooltip recipeComponent"><img src="/images/items/'+iName+'_lg.png" width="49" height="37" border="0" /></div>';
			}
		);
		strHTML += '</div>';
	}
	strHTML += '<div class="itemName quality_'+iData.qual+'">'+iData.dname+'</div>';
	strHTML += '<div class="goldIcon"><img src="/images/tooltips/gold.png" width="25" height="17" border="0" /></div>';
	strHTML += '<div class="goldCost">'+iData.cost+'</div>';
	strHTML += '</div>';
	strHTML += '<div class="largeItemImg"><img src="/dota2/images/items/'+iData.img+'" width="182" height="138" border="0" /></div>';
	strHTML += '<div class="itemBoxDetails">';
	strHTML += '<div class="itemBoxHR"><img src="/images/heropedia/itembox_hr.png" width="646" height="1" border="0" /></div>';
	strHTML += '<div class="detailBoxCol detailBoxLore">'+iData.lore+'&nbsp;</div>';
	strHTML += '<div class="detailBoxCol detailBoxDesc">'+iData.desc+'&nbsp;</div>';
	strHTML += '<div class="detailBoxCol detailBoxAttribs">'+iData.attrib+'&nbsp;';
	if ( iData.mc || iData.cd )
	{
		strHTML += '<div class="cooldownMana">';
		if ( iData.mc )
		{
			strHTML += '<div class="mana"><img alt="魔法消�?" title="魔法消�?" class="manaImg" src="/images/tooltips/mana.png" width="22" height="22" border="0" />'+iData.mc+'</div>';
		}
		if ( iData.cd )
		{
			strHTML += '<img alt="冷却时间" title="冷却时间" class="cooldownImg" src="/images/tooltips/cooldown.png" width="22" height="22" border="0" />'+iData.cd+'<br clear="left" />';
		}
		strHTML += '<br clear="left" /></div>';
	}
	strHTML += '</div><br clear="left" /></div>';
	return strHTML;
}

function showItemInFullBox( itemName, bHideTooltip )
{
	if ( !g_bItemDataReady )
		return;

	if ( bHideTooltip ) // if clicking a recipe component in header box
	{
		$('#itemTooltip').hide();
	}
	
	iData = g_rgItemData[itemName];	
	$('#itemsHeader').html( BuildItemFullBoxHTML( iData ) );
	// setup hover handlers for components
	$('.recipeComponent').hover(
		// Mouse over
		function( e )
		{
			
			ShowTooltip( 'item', e.currentTarget, true );
		},
		// Mouse out
		function( e )
		{
			ShowTooltip( 'item', e.currentTarget, false );
		}
	);
	if ( iData.created )
	{
		$.each( iData.components, 
			function( i, iName )
			{
				$('#recipeitem_'+iName).hover( 
					// Mouse over
					function( e )
					{
						
						ShowTooltip( 'item', e.currentTarget, true );
					},
					// Mouse out
					function( e )
					{
						ShowTooltip( 'item', e.currentTarget, false );
					}
				);
			}
		);
	}
	
}


