 
 
import {resolve} from "path"; 
 
<<<<<<< HEAD:src/AEHelper.ts
import  * as ae from ".." 
import { Query  , get ,allTypes  } from ".."
export const File : FileConstructor = <FileConstructor>{}
interface AEHelperInterface  {
=======
import  * as ae from "../.." 
import { Query  , get as getT   ,allTypes  } from "../.."
const File : FileConstructor = <FileConstructor>{}

export interface QueryParams {
    multi : boolean
}
export default interface AEHelperInterface  {
>>>>>>> refs/remotes/origin/develop:src/lib/AEHelper.ts
    convertPath(path:string) : string 
    getFile(path:string): File

    File(path:string) : File 
    addToGlobal(id: string, object: any) : void
    getItem(query: string , params : QueryParams ) : Query
    joinPath(...paths:string[]) : File  
   
    toArray( collection : Collection | PropertyGroup   ) :   [] 
} 
 
const get   : getT   = {} as getT 
ae.options.includes = []
 
ae.createSync(() => {
    enum AETypes {

        CompItem  = "CompItem"   , 
        FolderItem = "FolderItem"
    }
      class AEHelperImpl implements AEHelperInterface {
        private globalRegistry:Array<String>  = []
        constructor(){
         
        }

         
        joinPath (...paths : string[]) : File  {

            paths.map( path => this.convertPath(path)) 

            return this.getFile(paths.join("/"))
            

        }
        convertPath   (path :string) : string   {

            let regexStart = new RegExp(/^([C-Z]):/m)
        
            var replacedString = path.replace(regexStart,  (match,_1)=>{
                  return "/"+_1;
            }) ;

            return replacedString;
        }
        File(path:string ){
            return this.getFile(path)
        } 
        getFile(path:string   ){

            path = this.convertPath(path)
            
            let file = new File(path) 

            return file ;  
        }
        addToGlobal(id: string, object: any){
           if(this.globalRegistry.filter(it => it == id).length > 0 ){
                throw new Error( `Cannot add ${id} , because before already registered to globals `)
            }
            this.globalRegistry.push(id) 
            $.global[id] = object 
        } 
            
        getItem<T>(query: string , params : QueryParams) : T {

             let  returnType : T  
            let splited = query.split(".") 

            let context :any  = null 
            splited.every(it => {

        
                let firstChar = it.slice(0,1)  
                let remainChar = it.slice(1,it.length)
                switch(firstChar){
                    case "#" : 
                       context =  this.getFromComps(remainChar,context)
                        break  
                    case "!" : 
                       context =  this.getFromLayers(remainChar,context) 
                        break 
                    case "&" : 
                        context = this.getFromEffects(remainChar,context) 

                }

                if(context == null){
                    return false 
                }
                    
            })

            returnType = context  as T 
            return returnType 

            
        }
          getFromEffects(remainChar: string, context: any): PropertyBase {
             
            
            if(! (context instanceof AVLayer)){

                throw new Error("context is not a layer " + context)
            }
           return  (<AVLayer>context).effect(remainChar)
          }
          getFromItems(remainChar: string, context: any): any {
              throw new Error("Method not implemented.");
          }
          getFromLayers(remainChar: string , context: any) {
            let newContext = null 
            if(context == null) {
                (get() as Query).
               newContext  =  get.layers( undefined, remainChar) as Query; 
               return newContext.selection(0)

            }else if(context instanceof CompItem) {
              newContext  = get.layers((context as CompItem).layers,remainChar) as Query
              return newContext.selection(0)
            }
            
            return newContext
          }
          getFromComps(remainChar: string, context: any) : allTypes {
              get.comps
                let comps : Query = get.comps(remainChar) as Query;
                return comps.selection(0)     
            

          }
        
          
          toArray( collection : Collection | PropertyGroup    ) :   []{

            let array :   [] = [] 
            // @ts-ignore
            let length = collection.hasOwnProperty("numProperties") ?  collection.numProperties  :  collection.length 
             
            for(let i = 1 ; i != length + 1  ; i++){
                    let reflection : Reflection
                    // @ts-ignore
                     array.push(collection[i].name) 
                   }
                return array 

          }
          filter(array : [] , by : string  , type : string  ){
                // @ts-ignore
                array.map(value => { 
                    //@ts-ignore
                    let xml = (<Reflection>value.reflect).toXML() 
                    
                    //<Reflection>value.reflect).to 
                    return value 
                } )

          }
    }
   let  _AEHelper = new AEHelperImpl()
    _AEHelper.addToGlobal("AEHelper",_AEHelper)
<<<<<<< HEAD:src/AEHelper.ts
}, path.resolve(__dirname,".."   ,   "lib" , "includes"  , "AEHelper.jsx"))
=======
}, resolve(__dirname,".." , ".." ,   "lib" , "includes"  , "AEHelper.jsx"))

 
>>>>>>> refs/remotes/origin/develop:src/lib/AEHelper.ts