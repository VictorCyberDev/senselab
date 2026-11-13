const round = (value, digits = 3) => Number(value.toFixed(digits));

export const EXPERIMENTS = {
  heat: {
    id: 'heat', title: 'The Heat Challenge', field: 'Thermal physics', icon: '♨',
    question: 'How do mass, material and energy affect temperature change?',
    description: 'Apply conservation of energy to compare how materials respond to heating.',
    variables: [
      { key: 'mass', label: 'Mass', unit: 'kg', min: .1, max: 5, step: .1, value: 1 },
      { key: 'energy', label: 'Energy supplied', unit: 'J', min: 100, max: 20000, step: 100, value: 4200 },
      { key: 'initial', label: 'Initial temperature', unit: '°C', min: -20, max: 90, step: 1, value: 20 },
      { key: 'material', label: 'Material', type: 'select', value: 'water', options: [['water','Water'],['aluminium','Aluminium'],['iron','Iron']] }
    ],
    run(v) { const c={water:4184,aluminium:897,iron:449}[v.material]; const delta=v.energy/(v.mass*c); return {primary:round(v.initial+delta,2),unit:'°C',metrics:{'Temperature change':`${round(delta,2)} °C`,'Specific heat capacity':`${c} J/(kg·°C)`},series:Array.from({length:6},(_,i)=>({x:i/5*v.energy,y:v.initial+(i/5*v.energy)/(v.mass*c)})),explanation:`Energy divided by mass and specific heat capacity gives a temperature change of ${round(delta,2)} °C.`}; }
  },
  circuit: {
    id:'circuit',title:'Circuit Explorer',field:'Electricity',icon:'⚡',question:'How do voltage and resistance determine current and power?',description:'Build evidence for Ohm’s law using a safe ideal direct-current model.',
    variables:[{key:'voltage',label:'Voltage',unit:'V',min:0,max:24,step:.5,value:6},{key:'resistance',label:'Resistance',unit:'Ω',min:1,max:100,step:1,value:10}],
    run(v){const current=v.voltage/v.resistance,power=v.voltage*current;return{primary:round(current,3),unit:'A',metrics:{'Power':`${round(power,3)} W`,'Resistance':`${v.resistance} Ω`},series:Array.from({length:7},(_,i)=>({x:i*4,y:(i*4)/v.resistance})),explanation:`By Ohm’s law, current equals voltage divided by resistance: ${v.voltage} V ÷ ${v.resistance} Ω.`};}
  },
  motion: {
    id:'motion',title:'Motion Lab',field:'Mechanics',icon:'→',question:'How does constant acceleration change displacement and velocity?',description:'Investigate one-dimensional motion with reproducible kinematic equations.',
    variables:[{key:'velocity',label:'Initial velocity',unit:'m/s',min:-20,max:40,step:1,value:5},{key:'acceleration',label:'Acceleration',unit:'m/s²',min:-10,max:10,step:.5,value:2},{key:'time',label:'Time',unit:'s',min:0,max:20,step:.5,value:5}],
    run(v){const distance=v.velocity*v.time+.5*v.acceleration*v.time*v.time,final=v.velocity+v.acceleration*v.time;return{primary:round(distance,2),unit:'m',metrics:{'Final velocity':`${round(final,2)} m/s`,'Elapsed time':`${v.time} s`},series:Array.from({length:7},(_,i)=>{const t=i/6*v.time;return{x:t,y:v.velocity*t+.5*v.acceleration*t*t}}),explanation:`Displacement combines initial motion and the acceleration term, producing ${round(distance,2)} metres.`};}
  },
  population: {
    id:'population',title:'Population Dynamics',field:'Biology',icon:'◎',question:'How do growth rate and carrying capacity shape a population?',description:'Explore bounded logistic growth without pretending simulated values are field measurements.',
    variables:[{key:'initial',label:'Initial population',unit:'organisms',min:1,max:500,step:1,value:20},{key:'capacity',label:'Carrying capacity',unit:'organisms',min:50,max:1000,step:10,value:500},{key:'rate',label:'Growth rate',unit:'per day',min:.01,max:1,step:.01,value:.2},{key:'time',label:'Time',unit:'days',min:0,max:50,step:1,value:20}],
    validate(v){return v.initial>=v.capacity?'Initial population must be below carrying capacity for this investigation.':''},
    run(v){const calc=t=>v.capacity/(1+((v.capacity-v.initial)/v.initial)*Math.exp(-v.rate*t));const final=calc(v.time);return{primary:round(final,1),unit:'organisms',metrics:{'Carrying capacity':`${v.capacity} organisms`,'Capacity used':`${round(final/v.capacity*100,1)}%`},series:Array.from({length:11},(_,i)=>{const t=i/10*v.time;return{x:t,y:calc(t)}}),explanation:`Growth slows as the population approaches the carrying capacity, reaching ${round(final,1)} in this model.`};}
  }
};

export function runExperiment(id, values){const exp=EXPERIMENTS[id];if(!exp)throw new Error('Unknown experiment');const clean={};for(const variable of exp.variables){const raw=values[variable.key]??variable.value;clean[variable.key]=variable.type==='select'?String(raw):Number(raw);if(variable.type!=='select'&&(!Number.isFinite(clean[variable.key])||clean[variable.key]<variable.min||clean[variable.key]>variable.max))throw new RangeError(`${variable.label} must be between ${variable.min} and ${variable.max} ${variable.unit}.`);}const invalid=exp.validate?.(clean);if(invalid)throw new RangeError(invalid);return{...exp.run(clean),inputs:clean,experimentId:id,timestamp:new Date().toISOString()};}

export function evaluateReasoning({hypothesis='',conclusion='',result}){const evidenceWords=['because','evidence','result','show','therefore','data'];const combined=`${hypothesis} ${conclusion}`.toLowerCase();const supported=evidenceWords.filter(w=>combined.includes(w)).length;return{score:Math.min(4,(hypothesis.trim().length>20?1:0)+(conclusion.trim().length>35?1:0)+Math.min(2,supported)),feedback:supported?`Your explanation uses ${supported} evidence signal${supported===1?'':'s'}. Connect the measured ${result?.unit||'outcome'} directly to your claim.`:'State what the result shows, then explain why it supports or challenges your prediction.'};}

export function customLinearModel({input,coefficient,intercept}){for(const n of [input,coefficient,intercept])if(!Number.isFinite(Number(n)))throw new TypeError('Model values must be numeric.');return Number(coefficient)*Number(input)+Number(intercept);}
