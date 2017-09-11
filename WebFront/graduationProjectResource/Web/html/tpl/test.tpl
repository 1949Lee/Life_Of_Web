
    <?for(var i=0; i<@arr.length; i++){?>
    <div class="row">
        <div class="col-md-6 ">
            <!-- BEGIN SAMPLE FORM PORTLET-->
            <div class="portlet light ">
                <div class="portlet-title">
                    <div class="caption font-red-sunglo">
                        <i class="icon-settings font-red-sunglo"></i>
                        <span class="caption-subject bold uppercase"> Line Inputs</span>
                    </div>
                    <div class="actions">
                        <div class="btn-group">
                            <a class="btn btn-sm green dropdown-toggle" href="javascript:;"
                               data-toggle="dropdown"> Actions
                                <i class="fa fa-angle-down"></i>
                            </a>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a href="javascript:;">
                                        <i class="fa fa-pencil"></i> Edit </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i class="fa fa-trash-o"></i> Delete </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i class="fa fa-ban"></i> Ban </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="javascript:;"> Make admin </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="portlet-body form">
                    <form role="form">
                        <div class="form-body">
                            <div class="form-group form-md-line-input">
                                <input type="text" class="form-control" id="form_control_1<?=i?>"
                                       placeholder="Enter your name">
                                <label for="form_control_1<?=i?>">Regular input</label>
                                <span class="help-block">Some help goes here...</span>
                            </div>
                    </div>
                    </form>
                </div>
            </div>
            <!-- END SAMPLE FORM PORTLET-->
        </div>
        <div class="col-md-6 ">
            <!-- BEGIN SAMPLE FORM PORTLET-->
            <div class="portlet light ">
                <div class="portlet-title">
                    <div class="caption font-green">
                        <i class="icon-pin font-green"></i>
                        <span class="caption-subject bold uppercase"> Floating Labels</span>
                    </div>
                    <div class="actions">
                        <div class="btn-group">
                            <a class="btn btn-sm default dropdown-toggle" href="javascript:;"
                               data-toggle="dropdown"> Settings
                                <i class="fa fa-angle-down"></i>
                            </a>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a href="javascript:;">
                                        <i class="fa fa-pencil"></i> Edit </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i class="fa fa-trash-o"></i> Delete </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i class="fa fa-ban"></i> Ban </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="javascript:;"> Make admin </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="portlet-body form">
                    <form role="form">
                        <div class="form-body">
                            <div class="form-group form-md-line-input form-md-floating-label">
                                <input type="text" class="form-control test2" id="form_control_2<?=i?>">
                                <label for="form_control_2<?=i?>">Regular input</label>
                                <span class="help-block">Some help goes here...</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- END SAMPLE FORM PORTLET-->
        </div>
    </div>
    <?}?>
