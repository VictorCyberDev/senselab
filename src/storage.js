const KEYS={notebook:'senselab.notebook.v1',preferences:'senselab.preferences.v1',classrooms:'senselab.classrooms.v1',custom:'senselab.custom.v1',progress:'senselab.progress.v1'};
const parse=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const save=(key,value)=>{localStorage.setItem(key,JSON.stringify(value));return value};
export const store={
  getNotebook:()=>parse(KEYS.notebook,[]),
  addNotebook(entry){const all=store.getNotebook();all.unshift({...entry,id:crypto.randomUUID(),savedAt:new Date().toISOString()});return save(KEYS.notebook,all.slice(0,100));},
  deleteNotebook(id){return save(KEYS.notebook,store.getNotebook().filter(x=>x.id!==id));},
  clearNotebook:()=>save(KEYS.notebook,[]),
  getPreferences:()=>parse(KEYS.preferences,{highContrast:false,largeText:false,reducedMotion:false,verbose:true,volume:.35}),
  savePreferences:value=>save(KEYS.preferences,value),
  getClassrooms:()=>parse(KEYS.classrooms,[]),
  addClassroom(value){const all=store.getClassrooms();all.unshift({...value,id:crypto.randomUUID(),createdAt:new Date().toISOString()});return save(KEYS.classrooms,all);},
  getCustom:()=>parse(KEYS.custom,[]),
  addCustom(value){const all=store.getCustom();all.unshift({...value,id:crypto.randomUUID(),createdAt:new Date().toISOString()});return save(KEYS.custom,all);},
  progress:()=>parse(KEYS.progress,{}),
  markComplete(id){return save(KEYS.progress,{...store.progress(),[id]:new Date().toISOString()})},
  exportAll(){return{schemaVersion:1,exportedAt:new Date().toISOString(),notebook:store.getNotebook(),preferences:store.getPreferences(),classrooms:store.getClassrooms(),customExperiments:store.getCustom(),progress:store.progress()}},
  eraseAll(){Object.values(KEYS).forEach(k=>localStorage.removeItem(k));}
};

export function download(name,content,type='application/json'){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
