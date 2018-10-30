export interface Application {
    id?: string;
    approbation?: Approbation;
    /**
     * Un numéro d'actif. Doit être un nombre entier positif
     */
    assetId?: number;
    /**
     * L'id du citoyen qui fait la demande
     */
    citizenId?:    string;
    description?: string;
    firstName?:    string;
    lastName?:     string;
    plannedDate?: string;
    /**
     * Le statut de la demande
     */
    status?: string;
}

export interface Approbation {
    approvedBy?: string;
    approvedOn?: string;
    isApproved?: boolean;
}