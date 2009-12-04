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
	    Mojo.Log.info(space + key + ': {');	    
	}
	else {
	    Mojo.Log.info(space + '{');
	}
	for (var a in x) {
	    Mojo.Log.pp(x[a], 1+indent, a);
	}
	Mojo.Log.info(space + "},");
	break;

    case 'string':
	if (key) {
	    Mojo.Log.info(space + key + ': "' + x + '",');	    
	}
	else {
	    Mojo.Log.info(space + '"' + x + '",');
	}
	break;

    case 'array':
	if (key) {
	    Mojo.Log.info(space + key + ': [');
	}
	else {
	    Mojo.Log.info(space + '[');
	}
	for (var i = 0; i < x.length; ++i) {
	    Mojo.Log.pp(x[i], 1+indent);
	}
	Mojo.Log.info(space + '],');
	break;

    case 'null':
	if (key) {
	    Mojo.Log.info(space + key + ': (null),');
	}
	else {
	    Mojo.Log.info(space + '(null),');
	}
	break;

    default:
	if (key) {
	    Mojo.Log.info(space + key + ": " + x + ',');
	}
	else {
	    Mojo.Log.info(space + x + ',');
	}
	break;
    }
};
