function arch_ready() {
    language_select_source.change(function () {
        let new_lang = language_select_source.val();

        // force back translation language
        language_select_back.val(new_lang);

        // swap languages if the same as target
        if (new_lang == translator.lang_target) {
            translator.lang_target = translator.lang_source;
            language_select_target.val(translator.lang_source);
        }

        translator.lang_source = new_lang;
        // trigger translate chain
        translator.translate_target();
        translator.translate_source();
    });

    language_select_target.change(function () {
        let new_lang = language_select_target.val();

        // swap languages if the same as source
        if (new_lang == translator.lang_source) {
            translator.lang_source = translator.lang_target;
            language_select_source.val(translator.lang_target);
            language_select_back.val(translator.lang_target);
        }

        translator.lang_target = new_lang;
        // trigger translate chain
        translator.translate_target();
        translator.translate_source();
    });

    // on input triggers
    input_source.on('input', function () {
        translator.translate_source();
    });
    input_target.on('input', function () {
        translator.translate_target();
    });

    translator_backend.change(function() {
        translator.active = translator[translator_backend.val()];
        
        language_select_source.empty();
        language_select_target.empty();
        language_select_back.empty();

        // add available languages
        for (let k in translator.active.LANGUAGES) {
            language_select_source.append($('<option>', {
                text: k,
                value: translator.active.LANGUAGES[k]
            }));
            language_select_target.append($('<option>', {
                text: k,
                value: translator.active.LANGUAGES[k]
            }));
            language_select_back.append($('<option>', {
                text: k,
                value: translator.active.LANGUAGES[k]
            }));
        }
        // set default
        language_select_source.val(translator.lang_source);
        language_select_target.val(translator.lang_target);
        language_select_back.val(translator.lang_source);
        
        translator.translate_source();
    });

    translator_backend.val('transformer');
    translator_backend.trigger('change');

}