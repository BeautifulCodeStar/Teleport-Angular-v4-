"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function booleanFieldValueFactory() {
    return function booleanFieldValueMetadata(target, key) {
        var defaultValue = target[key];
        var localKey = "__md_private_symbol_" + key;
        target[localKey] = defaultValue;
        Object.defineProperty(target, key, {
            get: function () { return this[localKey]; },
            set: function (value) {
                this[localKey] = value != null && "" + value !== 'false';
            }
        });
    };
}
exports.BooleanFieldValue = booleanFieldValueFactory;
//# sourceMappingURL=field-value.js.map