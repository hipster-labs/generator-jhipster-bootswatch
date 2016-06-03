'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var packagejs = require(__dirname + '/../../package.json');
var cheerio = require('cheerio');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'bootswatch'};

// Stores JHipster functions
var jhipsterFunc = {};

var STRIP_HTML = 'stripHtml',
    STRIP_JS = 'stripJs',
    COPY = 'copy',
    TPL = 'template'

module.exports = yeoman.generators.Base.extend({
  initializing: {
    compose: function (args) {
      this.composeWith('jhipster:modules', {
        options: {
          jhipsterVar: jhipsterVar,
          jhipsterFunc: jhipsterFunc
        }
      });
    },

    displayLogo: function () {
      this.log(chalk.white('Welcome to the ' + chalk.bold('JHipster Bootswatch') + ' Module! ' + chalk.yellow('v' + packagejs.version + '\n')));
    }
  },
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'confirm',
      message: 'Would you like to enable Bootswatch themes?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.confirm = props.confirm;
      done();
    }.bind(this));
  },

  writing: {
    setupGlobalVar : function () {
      this.baseName = jhipsterVar.baseName;
      this.angularAppName = jhipsterVar.angularAppName;
      this.authenticationType = jhipsterVar.authenticationType;
      this.webappDir = jhipsterVar.webappDir;
      this.copyFiles = function (files) {
        files.forEach( function(file) {
          jhipsterFunc.copyTemplate(file.from, file.to, file.type? file.type: TPL, this, file.interpolate? { 'interpolate': file.interpolate } : undefined);
        }, this);
      };
    },

    writeClientSideFiles : function () {
      // collect files to copy
      var files = [
        { from: this.webappDir + '/app/components/bootswatch/_bootswatch.service.js', to: this.webappDir + '/app/components/bootswatch/bootswatch.service.js'},
        { from: this.webappDir + '/app/components/bootswatch/_bootswatch.directive.js', to: this.webappDir + '/app/components/bootswatch/bootswatch.directive.js'},
        { from: this.webappDir + '/app/components/bootswatch/_bootswatch.controller.js', to: this.webappDir + '/app/components/bootswatch/bootswatch.controller.js'}
      ];
      if(this.authenticationType == 'oauth2' || jhipsterVar.authenticationType == 'jwt'){
        files.push({ from: this.webappDir + '/app/blocks/interceptor/_bootswatch.interceptor.js', to: this.webappDir + '/app/components/interceptor/bootswatch.interceptor.js'});
      }
      this.copyFiles(files);
    },

    updateClientSideFiles : function () {
      if(this.authenticationType == 'oauth2' || jhipsterVar.authenticationType == 'jwt'){
        jhipsterFunc.addAngularJsInterceptor('BootswatchInterceptor');
      }
      jhipsterFunc.addTranslationKeyToAllLanguages('bootswatch', {'themeSelector' : 'Theme'}, 'addGlobalTranslationKey', jhipsterVar.enableTranslation);
      jhipsterFunc.rewriteFile(this.webappDir + '/index.html', '<!-- build:css content/css/main.css -->', '<!-- placeholder link to load bootswatch themes, title holds the current applied theme name-->\n' +
                  '<link rel="stylesheet" href="" id="bootswatch-css" title="Default">\n');

      var html = this.fs.read(this.webappDir + '/index.html');
      var $ = cheerio.load(html);
      var footer = $('.footer');
      if(footer.find('#bootswatch-theme-switcher').length == 0){
        footer.append("    <div ng-controller=\"BootswatchController as vm\" id=\"bootswatch-theme-switcher\" uib-dropdown class=\"dropup pull-right\">\n" +
                      "                    <a class=\"btn btn-default dropdown-toggle\"  uib-dropdown-toggle>\n" +
                      "                        <span class=\"glyphicon glyphicon-adjust\"></span>\n" +
                      "                        <span class=\"hidden-tablet\" translate=\"bootswatch.themeSelector\">Theme</span>\n" +
                      "                        <b class=\"caret\"></b>\n" +
                      "                    </a>\n" +
                      "                    <ul class=\"dropdown-menu\" role=\"menu\" uib-dropdown-menu>\n" +
                      "                        <li class=\"theme-link\" ng-repeat=\"theme in vm.themes\">\n" +
                      "                            <a href=\"\" jh-switch-theme=\"theme\">{{theme.name}}</a>\n" +
                      "                        </li>\n" +
                      "                    </ul>\n" +
                      "                </div>\n" +
                      "            ");
      }
      this.fs.write(this.webappDir + '/index.html', $.html());
    }
  },
  install: function () {
    var injectJsFilesToIndex = function () {
      this.log('\n' + chalk.bold.green('Running gulp Inject to add javascript to index\n'));
      this.spawnCommand('gulp', ['inject']);
    };
    if (!this.options['skip-install'] && !this.skipClient) {
      injectJsFilesToIndex.call(this);
    }
  },
});
