export interface Program {
  id: number;
  name: string;
  description?: string;
}

export interface ProgramToService {
  name: string;
  description?: string;  
}