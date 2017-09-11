<style>

body {
  display: flex;
  height: 100%; /* 1, 3 */
  flex-direction: column;
}

.m-row.m-row--root {
    flex: 1;   
}

.m-row.m-row--hor {
	display: flex;
  	//height: 100%; /* 1, 3 */
  	flex-direction: column;
}

.m-row.m-row--hor > .m-col {
	flex: none; /* 2 */;
}

.m-row.m-row--hor > .m-col--fluid {
	flex: 1 0 auto; /* 2 */
}

.m-row.m-row--ver {
	display: flex;
	//height: 100%; /* 1, 3 */
    flex-direction: row;
}

.m-row.m-row--ver .m-col {
    flex: 0 0 auto;
}

.m-row.m-row--ver .m-col--fluid {
	flex: 1;
}

</style>
  
    <div class="m-row m-row--hor m-row--root m--hide">
        <header class="m-col" style="background: red; display-: none; height: 70px;">
            <div class="Header Header--cozy" role="banner">
                header
            </div>
        </header>
        <main class="m-col m-col--fluid m-row m-row--ver" style="background: green; margin-top-: 70px;">
             <nav class="m-col" style="background: brown; display1: none; width: 200px;">
                <?php for($i = 0; $i < 1; $i++):?>
                    <p>The layout builder helps to configure the layout with below listed options and</p>
                    The layout builder helps to configure the layout with below listed options and
                <?php endfor;?>
            </nav>
            <article class="m-col m-col--fluid" style="background: purple">
        	   <?php for($i = 0; $i < 1; $i++):?>
	           <p>The layout builder helps to configure the layout with below listed options and</p>
	           The layout builder helps to configure the layout with below listed options and
        	   <?php endfor;?>
            </article>           
            <aside class="m-col" style="background: grey; display1: none; width: 200px;">
                <?php for($i = 0; $i < 1; $i++):?>
    	           <p>The layout builder helps to configure the layout with below listed options and</p>
    	           The layout builder helps to configure the layout with below listed options and
        	    <?php endfor;?>
            </aside>
        </main>
        <footer class="m-col" style="background: yellow; display-: none; height: 70px;">
            <div class="Footer">
                footer
            </div>
        </footer>
    </div>

    <div class="m-row m-row--hor m-row--root ">
        <header class="m-col" style="background: red; display-: none; height: 70px;">
            <div class="Header Header--cozy" role="banner">
                header
            </div>
        </header>
        <main class="m-col m-col--fluid m-row m-row--ver" style="background: green; margin-top-: 70px;">
            <div class="m-col" style="background: brown; display1: none; width: 200px;">
                <?php for($i = 0; $i < 1; $i++):?>
                    <p>The layout builder helps to configure the layout with below listed options and</p>
                    The layout builder helps to configure the layout with below listed options and
                <?php endfor;?>
            </div>
            <div class="m-col m-col--fluid m-row m-row--hor">
                <article class="m-col m-col--fluid" style="background: purple">
                   <?php for($i = 0; $i < 21; $i++):?>
                   <p>The layout builder helps to configure the layout with below listed options and</p>
                   The layout builder helps to configure the layout with below listed options and
                   <?php endfor;?>
                </article> 
                <footer class="m-col" style="background: yellow; display-: none; height: 70px;">
                    <div class="Footer">
                        footer
                    </div>
                </footer>
            </div>
            <aside class="m-col" style="background: grey; display1: none; width: 200px;">
                <?php for($i = 0; $i < 1; $i++):?>
                    <p>The layout builder helps to configure the layout with below listed options and</p>
                    The layout builder helps to configure the layout with below listed options and
                <?php endfor;?>
            </aside>
        </main>
    </div>