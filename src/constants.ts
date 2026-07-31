export const CATEGORIES = ['Alimentari','Casa','Trasporti','Ristoranti','Salute','Shopping','Intrattenimento','Abbonamenti','Istruzione','Viaggi','Altro'];
export const PAYMENTS = ['Contanti','Carta','Bancomat','Bonifico','PayPal','Altro'];
export const COLORS: Record<string,string> = {Alimentari:'#2A9D8F',Casa:'#E76F51',Trasporti:'#457B9D',Ristoranti:'#F4A261',Salute:'#E63946',Shopping:'#9B5DE5',Intrattenimento:'#F15BB5',Abbonamenti:'#00BBF9',Istruzione:'#43AA8B',Viaggi:'#577590',Altro:'#8D99AE'};
export const ICONS: Record<string,string> = {Alimentari:'cart-outline',Casa:'home-outline',Trasporti:'car-outline',Ristoranti:'restaurant-outline',Salute:'medkit-outline',Shopping:'bag-outline',Intrattenimento:'game-controller-outline',Abbonamenti:'repeat-outline',Istruzione:'school-outline',Viaggi:'airplane-outline',Altro:'ellipsis-horizontal-circle-outline'};
export const months = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
export const euro = (n:number) => n.toLocaleString('it-IT',{style:'currency',currency:'EUR'});
export const dateIT = (value:string|Date) => { const d = value instanceof Date ? value : new Date(value+'T12:00:00'); return d.toLocaleDateString('it-IT'); };
export const monthKey = (d:Date|string) => { const x=d instanceof Date?d:new Date(d+'T12:00:00'); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}`; };
export type Expense = {id:number; amount:number; description:string; category:string; date:string; payment:string; notes:string; created_at:string; updated_at:string};
