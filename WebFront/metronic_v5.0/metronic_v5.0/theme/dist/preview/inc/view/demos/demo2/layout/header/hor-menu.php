<!-- begin::Horizontal Menu -->
<div class="m-stack__item m-stack__item--middle m-stack__item--fluid">
	<div id="m_header_menu" class="m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas <?php Page::printClasses('header_menu', false);?>" <?php Page::printAttrs('header_menu')?> >
		<ul class="m-menu__nav <?php Page::printClasses('header_menu_nav', false)?>">
			<?php Menu::renderHorMenu(Page::getOption('menu', 'header/items'), Page::getOption('menu', 'header/self'))?>
		</ul>
	</div>
</div>
<!-- end::Horizontal Menu -->