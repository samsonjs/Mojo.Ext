// Pretty printer, handy for logging
Mojo.Log.pp = function(x, indent, key) {
    if (indent === undefined) {
	indent = 0;
    }
    
    var space = "";
    for (var j = 0; j < indent; j++) {
	space += "    ";
    }
	
    switch (typeOf(x)) {
    case 'object':
	if (key) {
	    print(space + key + ': {');	    
	}
	else {
	    print(space + '{');
	}
	for (var a in x) {
	    Mojo.Log.pp(x[a], 1+indent, a);
	}
	print(space + "},");
	break;

    case 'string':
	if (key) {
	    print(space + key + ': "' + x + '",');	    
	}
	else {
	    print(space + '"' + x + '",');
	}
	break;

    case 'array':
	if (key) {
	    print(space + key + ': [');
	}
	else {
	    print(space + '[');
	}
	for (var i = 0; i < x.length; ++i) {
	    Mojo.Log.pp(x[i], 1+indent);
	}
	print(space + '],');
	break;

    case 'null':
	if (key) {
	    print(space + key + ': (null),');
	}
	else {
	    print(space + '(null),');
	}
	break;

    default:
	if (key) {
	    print(space + key + ": " + x + ',');
	}
	else {
	    print(space + x + ',');
	}
	break;
    }
};
