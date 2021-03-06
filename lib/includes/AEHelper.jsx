

app.beginSuppressDialogs();
try {

(function () {
    var AETypes;
    (function (AETypes) {
        AETypes["CompItem"] = "CompItem";
        AETypes["FolderItem"] = "FolderItem";
    })(AETypes || (AETypes = {}));
    var AEHelperImpl = /** @class */function () {
        function AEHelperImpl() {
            this.globalRegistry = [];
        }
        AEHelperImpl.prototype.joinPath = function () {
            var _this = this;
            var paths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paths[_i] = arguments[_i];
            }
            paths.map(function (path) {
                return _this.convertPath(path);
            });
            return this.getFile(paths.join("/"));
        };
        AEHelperImpl.prototype.convertPath = function (path) {
            var regexStart = new RegExp(/^([C-Z]):/m);
            var replacedString = path.replace(regexStart, function (match, _1) {
                return "/" + _1;
            });
            return replacedString;
        };
        AEHelperImpl.prototype.getFile = function (path) {
            path = this.convertPath(path);
            
            var file = new File(path);
            return file;
        };
        AEHelperImpl.prototype.addToGlobal = function (id, object) {
            if (this.globalRegistry.filter(function (it) {
                return it == id;
            }).length > 0) {
                throw new Error("Cannot add " + id + " , because before already registered to globals ");
            }
            this.globalRegistry.push(id);
            $.global[id] = object;
        };
        AEHelperImpl.prototype.getItem = function (query) {
            var _this = this;
            var returnType;
            var splited = query.split(".");
            var context = null;
            splited.every(function (it) {
                var firstChar = it.slice(0, 1);
                var remainChar = it.slice(1, it.length);
                switch (firstChar) {
                    case "#":
                        context = _this.getFromComps(remainChar, context);
                        break;
                    case "!":
                        context = _this.getFromLayers(remainChar, context);
                        break;
                    case "&":
                        context = _this.getFromEffects(remainChar, context);
                }
                if (context == null) {
                    return false;
                }
            });
            returnType = context;
            return returnType;
        };
        AEHelperImpl.prototype.getFromEffects = function (remainChar, context) {
            if (!(context instanceof AVLayer)) {
                throw new Error("context is not a layer " + context);
            }
            return context.effect(remainChar);
        };
        AEHelperImpl.prototype.getFromItems = function (remainChar, context) {
            throw new Error("Method not implemented.");
        };
        AEHelperImpl.prototype.getFromLayers = function (remainChar, context) {
            var newContext = null;
            if (context == null) {
                newContext = __1.get.layers(undefined, remainChar).selection(0);
            } else if (context instanceof CompItem) {
                newContext = __1.get.layers(context.layers, remainChar).selection(0);
            }
            return newContext;
        };
        AEHelperImpl.prototype.getFromComps = function (remainChar, context) {
            var newContext = __1.get.comps(remainChar).selection(0);
            return newContext;
        };
        AEHelperImpl.prototype.toArray = function (collection) {
            var array = [];
            
            var length = collection.hasOwnProperty("numProperties") ? collection.numProperties : collection.length;
            for (var i = 1; i != length + 1; i++) {
                var reflection = void 0;
                
                array.push(collection[i].name);
            }
            return array;
        };
        AEHelperImpl.prototype.filter = function (array, by, type) {
            
            array.map(function (value) {
                
                var xml = value.reflect.toXML();
                //<Reflection>value.reflect).to 
                return value;
            });
        };
        return AEHelperImpl;
    }();
    var _AEHelper = new AEHelperImpl();
    _AEHelper.addToGlobal("AEHelper", _AEHelper);
}).apply(this);

} catch (err) {

}
app.endSuppressDialogs(false);