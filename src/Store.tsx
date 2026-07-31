import React,{createContext,useContext,useEffect,useState} from 'react';
import * as SQLite from 'expo-sqlite';
import {initDb} from './db'; import {Expense,monthKey} from './constants';
type Ctx={db:SQLite.SQLiteDatabase; expenses:Expense[]; budget:number; available:Record<string,number>; custom:string[]; reload:()=>Promise<void>; setBudget:(n:number)=>Promise<void>; setAvailable:(month:string,n:number)=>Promise<void>; add:(e:Omit<Expense,'id'|'created_at'|'updated_at'>)=>Promise<void>; update:(id:number,e:Omit<Expense,'id'|'created_at'|'updated_at'>)=>Promise<void>; remove:(id:number)=>Promise<void>; addCategory:(n:string)=>Promise<void>; removeCategory:(n:string)=>Promise<void>; clear:()=>Promise<void>};
const Store=createContext<Ctx|null>(null);
export function StoreProvider({children}:{children:React.ReactNode}){const [db]=useState(()=>SQLite.openDatabaseSync('gestore-spese.db')); const [expenses,setExpenses]=useState<Expense[]>([]); const [budget,setB]=useState(1500); const [available,setA]=useState<Record<string,number>>({}); const [custom,setCustom]=useState<string[]>([]);
 const reload=async()=>{setExpenses(await db.getAllAsync<Expense>('SELECT * FROM expenses ORDER BY date DESC, id DESC')); const settings=await db.getAllAsync<{key:string,value:string}>('SELECT key,value FROM settings'); const b=settings.find(x=>x.key==='budget'); if(b)setB(Number(b.value)); const av:Record<string,number>={}; settings.filter(x=>x.key.startsWith('available:')).forEach(x=>{av[x.key.slice(10)]=Number(x.value)}); setA(av); const c=await db.getAllAsync<{name:string}>('SELECT name FROM custom_categories ORDER BY name'); setCustom(c.map(x=>x.name));};
 useEffect(()=>{(async()=>{await initDb(db);await reload()})()},[]);
 const now=()=>new Date().toISOString();
 const add=async(e:any)=>{const n=now();await db.runAsync('INSERT INTO expenses (amount,description,category,date,payment,notes,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)',e.amount,e.description,e.category,e.date,e.payment,e.notes||'',n,n);await reload()};
 const update=async(id:number,e:any)=>{await db.runAsync('UPDATE expenses SET amount=?,description=?,category=?,date=?,payment=?,notes=?,updated_at=? WHERE id=?',e.amount,e.description,e.category,e.date,e.payment,e.notes||'',now(),id);await reload()};
 const remove=async(id:number)=>{await db.runAsync('DELETE FROM expenses WHERE id=?',id);await reload()};
 const setBudget=async(n:number)=>{await db.runAsync('INSERT OR REPLACE INTO settings(key,value) VALUES("budget",?)',String(n));setB(n)};
 const setAvailable=async(month:string,n:number)=>{await db.runAsync('INSERT OR REPLACE INTO settings(key,value) VALUES(?,?)',`available:${month}`,String(n));setA(x=>({...x,[month]:n}))};
 const addCategory=async(n:string)=>{await db.runAsync('INSERT OR IGNORE INTO custom_categories(name,color) VALUES(?,?)',n,'#6C63FF');await reload()}; const removeCategory=async(n:string)=>{await db.runAsync('DELETE FROM custom_categories WHERE name=?',n);await reload()};
 const clear=async()=>{await db.runAsync('DELETE FROM expenses');await db.runAsync('DELETE FROM settings');await db.runAsync('DELETE FROM custom_categories');await reload()};
 return <Store.Provider value={{db,expenses,budget,available,custom,reload,setBudget,setAvailable,add,update,remove,addCategory,removeCategory,clear}}>{children}</Store.Provider>}
export const useStore=()=>{const v=useContext(Store);if(!v)throw Error('Store non disponibile');return v};
