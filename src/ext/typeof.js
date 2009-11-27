// Provide a proper typeOf function since JavaScript's typeof is broken.
// (the native typeof operator returns 'object' for Objects, Arrays, and null)
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
	    if (typeof value.length === 'number' &&
                !(value.propertyIsEnumerable('length')) &&
                typeof value.splice === 'function') {
                s = 'array';
	    }
        } else {
	    s = 'null';
        }
    }
    return s;
}

