var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
    },
    askFor: function() {
        this.log(yosay('Hi Man, this is a front end generator!'));
        // var done = this.async();
        // // 建议使用this.log() 而不是console.log， 因为在非命令行环境下console.log()不会显示  
        // var prompts = [{
        //     type: 'confirm',
        //     name: 'someOption',
        //     message: 'Hello boy, would you like to enable this option?',
        //     default: true
        // }];

        // this.prompt(prompts, function(props) {
        //     this.someOption = props.someOption;
        //     done();
        // }.bind(this));
    },
    app: function() {
        // this.log('sourceRoot: %s, destinationRoot: %s', this.sourceRoot(),this.destinationRoot()); // 目标文件夹
        this.directory('copyContent', this.destinationRoot());
    }
});
