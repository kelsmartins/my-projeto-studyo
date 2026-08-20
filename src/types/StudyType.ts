export interface MaterialType {
    type: string | File;
    name: string;
    url?: string; // Dica: url como opcional pois o Supabase devolve ele!
}

export interface StudyType {
    id: string; // Trocado de UUID para string
    title: string;
    date: string; // Trocado de Date para string
    material: MaterialType[]; // Trocado de materials para material
    color_name: string;  
    color_hex: string; 
}