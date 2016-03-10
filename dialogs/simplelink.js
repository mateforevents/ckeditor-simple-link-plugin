(function (CKEDITOR) {
    'use strict';

    var isExternalURL = /^(http|https):\/\//;

    CKEDITOR.dialog.add("simplelinkDialog", function (editor) {
        return {
            allowedContent: "a[href,target]",
            title: editor.lang.simplelink.title,
            minWidth: 400,
            minHeight: 100,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents:[{
                id: "SimpleLink",
                label: "SimpleLink",
                elements:[{
                    type: "text",
                    label: "URL",
                    id: "edp-URL",
                    validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.simplelink.missingUrl),

                    /**
                     * Get the `href` attribute from the link being edited and make sure it has a
                     * scheme.
                     *
                     * @param {CKEDITOR.dom.element} element Currently selected element.
                     */
                    setup: function (element) {
                        var href = element.getAttribute("href");

                        if (href) {
                            if(!isExternalURL.test(href)) {
                                href = "http://" + href;
                            }
                            this.setValue(href);
                        }
                    },

                    /**
                     * Update selected element with new `href` value from dialog input.
                     *
                     * Also sets text content for link to the URL if no text value exists
                     * already.
                     *
                     * @param {CKEDITOR.dom.element} element Currently selected element.
                     */
                    commit: function (element) {
                        var href = this.getValue();

                        if (href) {
                            if(!isExternalURL.test(href)) {
                                href = "http://" + href;
                            }

                            element.setAttribute("href", href);

                            if(!element.getText()) {
                                element.setText(this.getValue());
                            }
                        }
                    }
                },
                {
                    type: "text",
                    label: editor.lang.simplelink.displayTextLabel,
                    id: "edp-text-display",

                    /**
                     * Set input value to text content of currently selected element.
                     *
                     * @param {CKEDITOR.dom.element} element Currently selected element.
                     */
                    setup: function (element) {
                        this.setValue(element.getText());
                    },

                    /**
                     * Update link text content with input value if non-empty.
                     *
                     * @param {CKEDITOR.dom.element} element Currently selected element.
                     */
                    commit: function (element) {
                        var currentValue = this.getValue();

                        if(currentValue !== "" && currentValue !== null) {
                            element.setText(currentValue);
                        }
                    }
                }]
            }],

            onShow: function () {
                var selection = editor.getSelection();
                var selector = selection.getStartElement();
                var element;

                if (selector) {
                    element = selector.getAscendant('a', true);
                }

                if (!element || element.getName() != 'a') {
                    element = editor.document.createElement('a');
                    element.setAttribute("target","_blank");

                    if (selection) {
                        element.setText(selection.getSelectedText());
                    }

                    this.insertMode = true;
                }
                else {
                    this.insertMode = false;
                }

                this.element = element;

                this.setupContent(this.element);
            },

            onOk: function () {
                this.commitContent(this.element);

                if (this.insertMode) {
                    editor.insertElement(this.element);
                }
            }
        };
    });
})(window.CKEDITOR);
