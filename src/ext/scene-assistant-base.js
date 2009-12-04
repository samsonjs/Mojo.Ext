Mojo.Ext.SceneAssistantBase = Class.create({
    setup: function() {
	var sa = this.controller.stageController.assistant;
	if (this.appMenuModel !== undefined) {	    
//	    Mojo.log('scene has appMenuModel, setting up menu with items: ', this.appMenuModel.items);
	    this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, this.appMenuModel);
	}
	else if (sa.appMenuModel !== undefined) {	    
//	    Mojo.log('stage assistant has appMenuModel, setting up menu with items: ', sa.appMenuModel.items);
	    this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, sa.appMenuModel);
	}
	else {
	    Mojo.log('no appMenuModel');
	}
    },

    cleanup: function() {
	this.stopListeners();
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
