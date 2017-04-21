(function(root, factory) {
  if (typeof define === 'function' && (define.amd || define.cmd)) {
    if (typeof callback === 'function' && typeof iife !== 'undefined' && iife === true) {
      var module_id = 'nodetpl_' + Math.random();
      define(module_id, factory);
      if (define.amd) {
        require([module_id], callback);
      } else if (define.cmd) {
        seajs.use([module_id], callback);
      } else {
        throw new Error('nodetpl cannot guess what the define means.');
      }
    } else {
      define(factory);
    }
  } else if (typeof require === 'function' && typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    if (root.nodetpl) {
      var result = factory();
      if (typeof callback === 'function' && typeof iife !== 'undefined' && iife === true) {
        callback(result);
      } else {
        var url = root.nodetpl.getCurrentScript();
        if (url) {
          root.nodetpl.cache[url] = result;
        }
      }
      return result;
    } else {
      throw new Error('nodetpl not found.');
    }
  }
}(this, function(require, exports, module) {
  'use strict';

  function NodeTpl() {
    this.version = '4.8.5';
    this.tpls = {};
    this.scripts = {};
    this.datas = {};
    this._initTpls()._initScripts();
    return this;
  }
  NodeTpl.prototype._generate = function() {
    return Math.random().toString().replace('.', '');
  };
  NodeTpl.prototype._initTpls = function() {
    var $NODETPL = this;
    this.tpls = {
      "main": function($DATA, guid) {
        var _ = '';
        var duid = $NODETPL.duid();
        guid = guid || $NODETPL.guid();
        try {
          var _eqstring;
          for (var i = 0; i < $DATA.arr.length; i++) {
            _ += '\n    <div class="row">\n        <div class="col-md-6 ">\n            \n            <div class="portlet light ">\n                <div class="portlet-title">\n                    <div class="caption font-red-sunglo">\n                        <i class="icon-settings font-red-sunglo"></i>\n                        <span class="caption-subject bold uppercase"> Line Inputs</span>\n                    </div>\n                    <div class="actions">\n                        <div class="btn-group">\n                            <a class="btn btn-sm green dropdown-toggle" href="javascript:;"\n                               data-toggle="dropdown"> Actions\n                                <i class="fa fa-angle-down"></i>\n                            </a>\n                            <ul class="dropdown-menu pull-right">\n                                <li>\n                                    <a href="javascript:;">\n                                        <i class="fa fa-pencil"></i> Edit </a>\n                                </li>\n                                <li>\n                                    <a href="javascript:;">\n                                        <i class="fa fa-trash-o"></i> Delete </a>\n                                </li>\n                                <li>\n                                    <a href="javascript:;">\n                                        <i class="fa fa-ban"></i> Ban </a>\n                                </li>\n                                <li class="divider"></li>\n                                <li>\n                                    <a href="javascript:;"> Make admin </a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <div class="portlet-body form">\n                    <form role="form">\n                        <div class="form-body">\n                            <div class="form-group form-md-line-input">\n                                <input type="text" class="form-control" id="form_control_1';
            _eqstring = $NODETPL.escapeHtml(i);
            if (typeof _eqstring === 'undefined') {
              _ += '';
            } else {
              _ += _eqstring;
            }

            _ += '"\n                                       placeholder="Enter your name">\n                                <label for="form_control_1';
            _eqstring = $NODETPL.escapeHtml(i);
            if (typeof _eqstring === 'undefined') {
              _ += '';
            } else {
              _ += _eqstring;
            }

            _ += '">Regular input</label>\n                                <span class="help-block">Some help goes here...</span>\n                            </div>\n                    </div>\n                    </form>\n                </div>\n            </div>\n            \n        </div>\n        <div class="col-md-6 ">\n            \n            <div class="portlet light ">\n                <div class="portlet-title">\n                    <div class="caption font-green">\n                        <i class="icon-pin font-green"></i>\n                        <span class="caption-subject bold uppercase"> Floating Labels</span>\n                    </div>\n                    <div class="actions">\n                        <div class="btn-group">\n                            <a class="btn btn-sm default dropdown-toggle" href="javascript:;"\n                               data-toggle="dropdown"> Settings\n                                <i class="fa fa-angle-down"></i>\n                            </a>\n                            <ul class="dropdown-menu pull-right">\n                                <li>\n                                    <a href="javascript:;">\n                                        <i class="fa fa-pencil"></i> Edit </a>\n                                </li>\n                                <li>\n                                    <a href="javascript:;">\n                                        <i class="fa fa-trash-o"></i> Delete </a>\n                                </li>\n                                <li>\n                                    <a href="javascript:;">\n                                        <i class="fa fa-ban"></i> Ban </a>\n                                </li>\n                                <li class="divider"></li>\n                                <li>\n                                    <a href="javascript:;"> Make admin </a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <div class="portlet-body form">\n                    <form role="form">\n                        <div class="form-body">\n                            <div class="form-group form-md-line-input form-md-floating-label">\n                                <input type="text" class="form-control test2" id="form_control_2';
            _eqstring = $NODETPL.escapeHtml(i);
            if (typeof _eqstring === 'undefined') {
              _ += '';
            } else {
              _ += _eqstring;
            }

            _ += '">\n                                <label for="form_control_2';
            _eqstring = $NODETPL.escapeHtml(i);
            if (typeof _eqstring === 'undefined') {
              _ += '';
            } else {
              _ += _eqstring;
            }

            _ += '">Regular input</label>\n                                <span class="help-block">Some help goes here...</span>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            \n        </div>\n    </div>\n    ';
          }
        } catch (e) {
          console.log(e, e.stack);
        }
        if ($DATA) {
          $NODETPL.datas[duid] = $DATA;
        }
        return _;
      }
    };
    return $NODETPL;
  };
  NodeTpl.prototype._initScripts = function() {
    var $NODETPL = this;
    this.scripts = {

    };
    return $NODETPL;
  };
  NodeTpl.prototype.duid = function() {
    return 'nodetpl_d_' + this._generate();
  };
  NodeTpl.prototype.guid = function() {
    return 'nodetpl_g_' + this._generate();
  };
  NodeTpl.prototype.escapeHtml = function(html) {
    return html ? html.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') : html;
  };
  NodeTpl.prototype.render = function(data, guid) {
    return this.tpls.main(data, guid || this.guid());
  };
  return {
    render: function(data) {
      return new NodeTpl().render(data);
    }
  };
}));