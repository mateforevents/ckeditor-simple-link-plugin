(function (CKEDITOR) {
    CKEDITOR.plugins.add('simplelink', {
        icons: 'simplelink',
        lang: 'en,nb',

        init: function (editor) {
            editor.addCommand('simplelink', new CKEDITOR.dialogCommand('simplelinkDialog'));
            editor.ui.addButton('SimpleLink', {
                label: 'Add a link',
                icons: 'simplelink',
                command: 'simplelink'
            });

            CKEDITOR.dialog.add('simplelinkDialog', this.path + 'dialogs/simplelink.js');
        }
    });
})(window.CKEDITOR);
