Mojo.Ext.SceneAssistantBase = Class.create({
    setup: function() {
	var sc = this.controller.stageController;
	if (this.appMenuModel !== undefined) {	    
	    this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, this.appMenuModel);
	}
	else if (sc.appMenuModel !== undefined) {	    
	    this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, sc.appMenuModel);
	}
    },

    setupListener: function(name, event, callback) {
	if (this._registeredListeners === undefined) {
	    this._registeredListeners = {};
	}
	Mojo.Event.listen(this[name], event, callback);
	this._registeredListeners[name] = {'event': event, 'callback': callback};
    },

    stopListeners: function() {
	for (var name in this._registeredListeners) {
	    var listener = this._registeredListeners[name];
	    this.controller.stopListening(name, listener.event, listener.callback.bind(this));
	}
    },

    initWidget: function(name, attributes, model) {
	if (this[name + "Model"] === undefined) {
	    this[name + "Model"] = model;
	}
	this.controller.setupWidget(name, attributes, model);
	if (this[name] === undefined) {
	    this[name] = this.controller.get(name);
	}
	return this[name];
    },
	
    initButton: function(name, label_or_model, callback, type_or_attributes) {
	var model, attributes;
	if (typeof label_or_model === 'string') {
	    model = {
		"label" : label_or_model,
		"buttonClass" : "",
		"disabled" : false
	    };
	}
	else {
	    model = label_or_model;
	}
	if (type_or_attributes === undefined) {
	    attributes = {};
	}
	else if (typeof type_or_attributes === 'string') {
	    attributes = {
		"type" : type_or_attributes
	    };
	}
	else {
	    attributes = type_or_attributes;
	}
	this.initWidget(name, attributes, model);
	this.setupListener(name, Mojo.Event.tap, callback.bind(this));
	return this[name];
    },

    initList: function(name, items_or_model, callback, itemTemplate_or_attributes) {
	var model, attributes;
	if (typeOf(items_or_model) === 'array') {
	    model = {
		"listTitle" : 'List',
		"items" : items_or_model
	    };
	}
	else {
	    model = items_or_model;
	}
	if (itemTemplate_or_attributes === undefined) {
	    attributes = {};
	}
	else if (typeof itemTemplate_or_attributes === 'string') {
	    attributes = {
		"itemTemplate" : itemTemplate_or_attributes
	    };
	}
	else {
	    attributes = itemTemplate_or_attributes;
	}
	this.initWidget(name, attributes, model);
	this.setupListener(name, Mojo.Event.listTap, callback.bind(this));
	return this[name];
    }
});

//
    this.listModel = {listTitle:'Topic News', items:this.stories};
    
    var listAttributes = {
	itemTemplate: 'feed/listitem',
	emptyTemplate: 'feed/emptylist',
	dividerFunction: this.getDivider.bind(this),
	dividerTemplate: 'feed/divider'
    };
    
    // Set up the attributes & model for the List widget:
    this.controller.setupWidget('storyList', listAttributes, this.listModel);
    this.storyList = this.controller.get('storyList');
    
    this.listClickHandler = this.listClickHandler.bind(this);
    Mojo.Event.listen(this.storyList, Mojo.Event.listTap, this.listClickHandler);
