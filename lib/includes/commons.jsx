 
(function (global) {
    
    global.convertPath = function (path) {
        var regexStart = new RegExp(/^([C-Z]):/m);
        var newPath = path.replace(regexStart, function (match, _1) {
            return "/" + _1;
        });
        return new File(path)
    }
    global.toArray = function (items) {
        var size = 0
        var itemMethod = null
        var objRef = getReflection(items)
        var props = objRef.properties
        var methods = objRef.methods
        
        if (props.has("length")) {
            size = items.length
        }
         else if (props.has("numProperties")) {
            size = items.numProperties
            itemMethod = "property"
        }else  if (methods.has("count")) {
            size = items.count()
        } else if (props.has("numOutputModules")){
                size= items.numOutputModules
                itemMethod = "outputModule"
        }
        if (size == 0) {
            return [items]
        }
        var array = [];
        // indexes start from 1 
        for (var i = 1; i != size + 1; i++) {
            var item = null
            switch (itemMethod) {
                case "outputModule" : 
                array = items.outputModule(1).templates
                break ;
                case "property":
                    array.push(items.property(i))
                    break;
                default:
                    array.push(items[i])
                    break;
            }
        }
        return array
    }
    global.has = function (obj, key, type) {
        var objRef = getReflection(obj)
        var context = objRef.properties
        switch (type) {
            case "both":
            case "method":
            case "methods":
                context = context.concat(objRef.methods)
                break;
            default:
                break;
        }
        return context.has(key)
    }
    global.getReflection = function (obj) {
        return obj.reflect
    }
    global.getValue = function (obj, key) {
        if (!has(obj, key))
            throw new Error(key + "not exists in " + obj)
        return obj[key]
    }
    global.open = function (path) {
        var file = convertPath(path)
        return app.open(file)
    }
    global.openProject = function (path){
        var file = convertPath(path)
        return app.open(file)
    }
    global.close = function (closeOptions) {
        if (typeof closeOptions == "undefined") {
            closeOptions = CloseOptions.DO_NOT_SAVE_CHANGES
        }
        return app.project.close(closeOptions)
    }
    global.render=function (comp, file , outputModule , outFile, outTemplate) {
       var item =  project.renderQueue.items.add(comp)
       var module = item.outputModule()
       toArray(module)
        
    } 
   
}) ($.global)
