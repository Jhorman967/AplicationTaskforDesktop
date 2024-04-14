

export type Status = 'Pendientes' | 'En Proceso' | 'Finalizado'

export interface Data {
    id: number
    titulo: string
    content: string
    date: Date
    statusN: Status

}

